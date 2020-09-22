import nextConnect from 'next-connect';
import gmail from 'middleware/gmail';

function encodeMessage({ name, email, subject, message }){
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    `To: ${name} <${email}>`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: Re: ${utf8Subject}`,
    '',
    `Draga/dragi ${name},<br><br>`,
    'Hvala vam na vašoj poruci. Nastojati ćemo odgovoriti u što kraćem roku.<br><br>',
    'OPG Kvakić<br><br>',
    'Vaša poruka:<br>',
    `<div style="background-color: #eee; padding: 2em 2em; margin: 1em">${message.replace(/\n/g, '<br>')}</div>`,
  ];
  const fullMessage = messageParts.join('\n');
  return Buffer.from(fullMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const handler = nextConnect();

handler.use(gmail);

handler.post( (req, res) => {
  const { name, email, subject, message } = req.body;
  if (name && email && subject && message){
    req.gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodeMessage(req.body),
      }
    }).then(ret => {
      res.status(200).end();
    }).catch(err => {
      console.error('Message not sent:', err);
      res.status(400).end();
    });
  } else {
    res.status(400).end();
  }
});

export default handler;
