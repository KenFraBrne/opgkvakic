import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import middleware from 'middleware';
import { encodedCreateUser } from 'layout/Email/CreateUser';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { username, password, address, lang } = req.body;
  const email = normalizeEmail(req.body.email);
  // check if email is ok
  if ( !isEmail(email) ) return res.status(400).end();
  else {
    // check if email already exists
    const nEmails = await req.db.collection('users').countDocuments({ email });
    if (nEmails > 0) return res.status(403).end();
    else {
      // hash password & create verify token
      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyToken = crypto.randomBytes(20).toString('hex');
      // insert user
      const user = await req.db
        .collection('users')
        .insertOne({
          username,
          password: hashedPassword,
          email,
          address,
          verified: false,
          verifyToken,
        })
        .then(ret => ret.ops[0])
        // or throw error
        .catch(() => res.status(500).end());
      // send welcome message
      const raw = encodedCreateUser({ username, lang, email, verifyToken, req });
      req.gmail.users.messages
        .send({
          userId: 'me',
          requestBody: { raw }
        })
        // or throw error
        .catch(() => res.status(503).end())
      // log in
      req.login(user, err => {
        if (!err) return res.status(201).end();
        // or throw error
        else return res.status(511).end();
      });
    }
  };
});

export default handler;
