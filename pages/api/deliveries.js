import nextConnect from 'next-connect';
import middleware from 'middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

  // filter by date + 2 days
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 2);

  // deliveries
  const deliveries = await req.db
    .collection('deliveries')
    .find({
      from: {
        $gte: new Date(date.toISOString()),
      }
    })
    .toArray();
  res.send(deliveries);

});

export default handler;
