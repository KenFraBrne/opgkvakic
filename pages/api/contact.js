import nextConnect from 'next-connect';
import middleware from 'middleware';
import { encodedContactResponse } from 'layout/Email/ContactResponse';

const handler = nextConnect();

handler.use(middleware);

handler.post( (req, res) => {
  const { name, email, subject, message, lang } = req.body;
  if (name && email && subject && message){
    const raw = encodedContactResponse({ name, email, subject, message, lang });
    req.gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw },
    }).then(() => res.status(200).end())
      .catch(() => res.status(500).end());
  } else {
    res.status(400).end();
  }
});

export default handler;
