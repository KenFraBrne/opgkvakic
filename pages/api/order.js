import nextConnect from 'next-connect';
import middleware from 'middleware';
import passport from 'middleware/passport';

const handler = nextConnect();

handler.use(middleware);

handler.get( (req, res) => {
  const order = req.session.order || {};
  res.status(200).json(order);
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
