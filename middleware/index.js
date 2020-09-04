import nextConnect from 'next-connect';
import database from 'middleware/database';
import session from 'middleware/session';
import passport from 'middleware/passport';

const handler = nextConnect()
  .use(database)
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default handler;
