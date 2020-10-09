import nextConnect from 'next-connect';
import middleware from 'middleware';
import passport from 'middleware/passport';
import { ObjectId } from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const order = req.session.order || null;
  if (order?.products) {
    // filter products which do not exist anymore (via mask)
    const ids = order.products.map( product => product._id );
    const promises = ids.map( _id => {
      return req.db
        .collection('products')
        .findOne({ _id: new ObjectId(_id) })
        .then(ret => !!ret);
    });
    const mask = await Promise.all(promises);
    const products = order.products.filter( ( _, ind ) => mask[ind]);
    // replace products in order
    order.products = products;
  };
  res.status(200).send({ order });
});

handler.post( (req, res) => {
  req.session.order = req.body;
  res.status(200).end();
});

handler.delete( (req, res) => {
  delete req.session.order;
  res.status(200).end();
});

export default handler;
