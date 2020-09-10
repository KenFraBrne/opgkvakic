import nextConnect from 'next-connect';
import middleware from 'middleware';
import passport from 'middleware/passport';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const user = req?.user;
  if (user) delete user.password;
  res.status(200).send({ user });
});

export default handler;
