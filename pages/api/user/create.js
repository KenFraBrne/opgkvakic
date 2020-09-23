import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import middleware from 'middleware';

function encodeMessage({ username, email, verifyToken, req }){
  const subject = 'Dobrodošli!';
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    `To: ${username} <${email}>`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    `Draga/dragi ${username},<br><br>`,
    'Hvala vam što ste nam se pridužili 😉<br><br>',
    'Kako bi aktivirali vaš korišnički račun i omogučili naručivanje, molimo vas da kliknete',
    `<a href="${req.headers.origin}/user/verify/${verifyToken}">ovaj link</a><br><br>`,
    'Do skora  👋<br>',
    'OPG Kvakić<br><br>',
  ];
  const fullMessage = messageParts.join('\n');
  return Buffer.from(fullMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

  const { username, password } = req.body;
  const email = normalizeEmail(req.body.email);

  if (!isEmail(email)){
    res.status(400).send('Email nije dobar');
  } else {
    const nEmails = await req.db.collection('users').countDocuments({ email });
    if (nEmails > 0) {
      res.status(403).send('Email vec postoji');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyToken = crypto.randomBytes(20).toString('hex');
      req.db
        .collection('users')
        .insertOne({
          username,
          password: hashedPassword,
          email,
          verified: false,
          verifyToken,
        })
        .then(ret => {
          const user = ret.ops[0];
          req.login(user, err => {
            if (err) res.status(511).send('Korisnik se treba upisati');
            req.gmail.users.messages.send({
              userId: 'me',
              requestBody: {
                raw: encodeMessage({ username, email, verifyToken, req }),
              }
            }).then(() => console.log('email poslan'))
              .catch(() => console.log('email nije poslan'));
            res.status(201).send('Korisnik upisan!');
          });
        })
        .catch(() => {
          res.status(503).send('Greška pri registraciji');
        });
    }
  };
});

export default handler;
