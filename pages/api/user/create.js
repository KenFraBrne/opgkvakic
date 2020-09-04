import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcrypt';
import middleware from 'middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

  const {username, password} = req.body;
  const email = normalizeEmail(req.body.email);

  if (!isEmail(email)){
    res.status(400).send('Email nije dobar');
  } else {
    const nEmails = await req.db.collection('users').countDocuments({ email });
    if (nEmails > 0) {
      res.status(403).send('Email vec postoji');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await req.db
        .collection('users')
        .insertOne({
          username,
          password: hashedPassword,
          email,
        })
        .then(res => res.ops[0]);
      req.login(user, (err) => {
        if (err){
          res.status(503).send('Greška pri registraciji');
        } else {
          res.status(201).send('Korisnik upisan!');
        }
      })
    }
  };
});

export default handler;
