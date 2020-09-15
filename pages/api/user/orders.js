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
      .find({ user: req.user._id })
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

export default handler;
