import nextConnect from 'next-connect';
import middleware from 'middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get( (req, res) => {
  req.db
    .collection('posts')
    .find({})
    .toArray()
    .then(posts => {
      res.status(200).send({ posts });
    }).catch(err => {
      res.status(500).send({ posts: null });
    });
});

export default handler;
