import nextConnect from 'next-connect';
import middleware from 'middleware';
import passport from 'middleware/passport';
import { ObjectId } from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.put( (req, res) => {
  if (req.isAuthenticated()){
    const body = req.body;
    const user = req.user;
    const filter = { _id: user._id };
    const update = { $set: body };
    req.db
      .collection('users')
      .findOneAndUpdate(filter, update)
      .then(ret => {
        const newUser = {...user, ...body};
        delete newUser.password;
        res.status(200).send({ user: newUser });
      });
  } else {
    res.status(403).end();
  };
});

handler.delete((req, res) => {
  if (req.isAuthenticated()){
    req.db
      .collection('users')
      .findOneAndDelete({_id: req.user._id})
      .then(ret => {
        console.log(ret);
        req.logout();
        res.status(204).end();
      })
  } else {
    res.status(403).end();
  };
});

export default handler;
