import nextConnect from 'next-connect';
import middleware from 'middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get( (req, res) => {
  req.db
    .collection('products')
    .find({
      total: {
        $gt: 0,
      }
    })
    .toArray()
    .then(products => {
      res.status(200).send({ products });
    })
    .catch(err => {
      res.status(500).send({ products: null });
    });
});

export default handler;
