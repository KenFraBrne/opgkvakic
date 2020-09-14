import nextConnect from 'next-connect';
import middleware from 'middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get( (req, res) => {

  // filter by date + 2 days
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 2);

  // send
  req.db
    .collection('deliveries')
    .find({
      from: { $gte: new Date(date.toISOString()) },
      places: { $gte: 1 },
    })
    .toArray()
    .then(deliveries => {
      res.status(200).send({ deliveries });
    })
    .catch(err => {
      res.status(500).send({ deliveries: null });
    });

});

export default handler;
