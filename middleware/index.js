import nextConnect from 'next-connect';
import mongoDatabase from 'middleware/mongoDatabase';
import mongoSession from 'middleware/mongoSession';

const handler = nextConnect()
  .use(mongoDatabase)
  .use(mongoSession);

export default handler;
