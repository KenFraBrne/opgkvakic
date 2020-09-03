import nextConnect from 'next-connect';
import middleware from 'middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const posts = await req.db
    .collection('posts')
    .find({})
    .toArray();
  res.send(posts);
});

export default handler;
