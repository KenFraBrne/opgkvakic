import nextConnect from 'next-connect';
import database from 'middleware/database';
import gmail from 'middleware/gmail';
import session from 'middleware/session';
import passport from 'middleware/passport';

const handler = nextConnect()
  .use(database)
  .use(gmail)
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default handler;
