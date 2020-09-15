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
      .lookup({
        from: 'users',
        foreignField: '_id',
        localField: 'user',
        as: 'user',
      })
      .unwind('$user')
      .match({
        'user._id': req.user._id
      })
      .lookup({
        from: 'deliveries',
        foreignField: '_id',
        localField: 'delivery',
        as: 'delivery',
      })
      .unwind('$delivery')
      .unwind('$products')
      .lookup({
        from: 'products',
        foreignField: '_id',
        localField: 'products._id',
        as: 'details',
      })
      .unwind('$details')
      .group({
        _id: '$_id',
        'date': { $first: '$delivery.from'},
        'amount': { $push: '$products.amount' },
        'name': { $push: '$details.name' },
        'price': { $push: '$details.price' },
        'unit': { $push: '$details.priceUnit' },
        'text': { $push: '$details.priceText' },
      })
      .sort({
        'date': -1,
      })
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
    const order = req.session.order;

    // transform order to contain ObjectIds
    const delivery = new ObjectId(order.delivery);
    const products = Object.entries(order.products).map(entry => {
      const [_id, amount] = entry;
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

    // delete session order and end
    delete req.session.order;
    res.status(200).end();

  } else {
    res.status(403).end();
  };

});

export default handler;
