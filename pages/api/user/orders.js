import nextConnect from 'next-connect';
import middleware from 'middleware';
import passport from 'middleware/passport';
import { ObjectId } from 'mongodb';

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
      user: req.user._id,
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
    // delete session order and end
    delete req.session.order;
    res.status(200).end();
  } else {
    res.status(403).end();
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
