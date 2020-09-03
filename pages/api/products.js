import nextConnect from 'next-connect';
import middleware from 'middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const products = await req.db
    .collection('products')
    .find({
      total: {
        $gt: 0,
      }
    })
    .toArray();
  res.send(products);
});

export default handler;
