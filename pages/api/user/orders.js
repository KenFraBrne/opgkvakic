import nextConnect from 'next-connect';
import middleware from 'middleware';
import passport from 'middleware/passport';
import { ObjectId } from 'mongodb';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ProductSummary from 'component/ProductSummary';
import fromUntilString from 'util/fromUntilString';

function encodeMessage({ user, order, products, delivery }){
  const dateString = delivery.from.toLocaleDateString();
  const subject = `Vaša narudžba za ${dateString} je zaprimljena!`;
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const table = ReactDOMServer.renderToString(<ProductSummary order={order} products={products}/>)
  const messageParts = [
    `To: ${user.username} <${user.email}>`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    `Draga/dragi ${user.username},<br><br>`,
    'Hvala vam na vašoj narudžbi 👍<br><br>',
    `Narudžba će biti dostavljena ${dateString} u periodu ${fromUntilString(delivery)}<br><br>`,
    'Detalji narudžbe nalaze se ispod.<br><br>',
    'OPG Kvakić<br><br>',
    table,
  ];
  const fullMessage = messageParts.join('\n');
  return Buffer.from(fullMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const handler = nextConnect();

handler.use(middleware);

handler.get( (req, res) => {
  if (req.isAuthenticated()){
    req.db
      .collection('orders')
      .aggregate()
      // get user orders
      .match({ user: req.user._id })
      // get delivery info
      .lookup({
        from: 'deliveries',
        localField: 'delivery',
        foreignField: '_id',
        as: 'delivery',
      })
      .unwind('$delivery')
      // get products info
      .unwind('$products')
      .lookup({
        from: 'products',
        localField: 'products._id',
        foreignField: '_id',
        as: 'products.details',
      })
      .unwind('$products.details')
      // group, project & sort them
      .group({
        _id: '$_id',
        delivery: { '$first': '$delivery' },
        products: { '$push': '$products' },
      })
      .project({
        _id: 1,
        'delivery.from': 1,
        'delivery.until': 1,
        'products._id': 1,
        'products.amount': 1,
        'products.details.by': 1,
        'products.details.price': 1,
        'products.details.priceUnit': 1,
        'products.details.priceText': 1,
      })
      .sort({ _id: 1 })
      // and finally
      .toArray()
      .then(orders => {
        res.status(200).send({ orders });
      })
      .catch(err => {
        res.status(503).end();
      });
  } else {
    res.status(403).end();
  };
});

handler.post( async (req, res) => {
  if (req.isAuthenticated()){
    const user = req.user;
    // check if user is verified
    if (!user.verified){
      res.status(403).send('Korisnički email nije potvrđen');
      return;
    };
    // transform order to contain ObjectIds
    const order = req.session.order;
    const delivery = new ObjectId(order.delivery);
    const products = order.products.map(product => {
      const { _id, amount } = product;
      return {
        _id: new ObjectId(_id),
        amount,
      };
    });
    const transOrder = {
      user: user._id,
      delivery,
      products,
    };
    // insert a new order
    await req.db
      .collection('orders')
      .insertOne(transOrder);
    // update products collection
    products.forEach(async product => {
      const { _id, amount } = product;
      const query = { _id };
      const update = {
        $inc: { total: -amount },
      };
      await req.db
        .collection('products')
        .updateOne(query, update);
    });
    // update deliveries collection
    const query = { _id: delivery };
    const update = {
      $inc: { places: -1 },
    };
    await req.db
      .collection('deliveries')
      .updateOne(query, update);
    // send a confirmation email;
    const shopProducts = await req.db
      .collection('products')
      .find({})
      .toArray();
    const shopDelivery = await req.db
      .collection('deliveries')
      .findOne({ _id: delivery });
    req.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodeMessage({
          user,
          order,
          products: shopProducts,
          delivery: shopDelivery,
        }),
      },
    }).then(ret => {
      // delete session order
      delete req.session.order;
      res.status(200).end();
    }).catch(err => {
      console.error('Message not sent:', err);
      res.status(400).send('Greška u zaprimanju narudžbe');
    });
  } else {
    res.status(403).send('Morate biti prijavljeni za narudžbu');
  };
});

handler.delete( async (req, res) => {
  if (req.isAuthenticated()){
    // get order
    const _id = new ObjectId(req.body._id);
    const order = await req.db
      .collection('orders')
      .findOne({ _id });
    const products = order.products;
    const delivery = order.delivery;
    // update products collection
    products.forEach(async product => {
      const { _id, amount } = product;
      const query = { _id };
      const update = {
        $inc: { total: +amount },
      };
      await req.db
        .collection('products')
        .updateOne(query, update);
    });
    // update deliveries
    const query = { _id: delivery };
    const update = {
      $inc : { places: +1 },
    };
    await req.db
      .collection('deliveries')
      .updateOne(query, update);
    // remove order and end
    req.db
      .collection('orders')
      .deleteOne({ _id });
    res.status(200).end();
  } else {
    res.status(403).end();
  };
});

export default handler;
