import nextConnect from 'next-connect';
import middleware from 'middleware';
import passport from 'middleware/passport';

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate('local'), (req, res) => res.end());

handler.delete((req, res) => {
  req.logout();
  res.status(204).end();
});

export default handler;