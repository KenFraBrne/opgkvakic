import React from 'react';
import ReactDOMServer from 'react-dom/server';

import getLanguage from 'util/getLanguage';
import encodeMessage from 'util/encodeMessage';

export function ContactResponse({ name, message, content }){
  return (
    <div>
      <p> { content.p[0].replace('name', name) } </p>
      <p> { content.p[1] } </p>
      <p> OPG Kvakić </p>
      <p> { content.p[2] } </p>
      <div style={{ color: 'blue' }}>
        {
          message
            .split('\n')
            .map( (line, ind) => <p key={ind}>{line}</p> )
        }
      </div>
    </div>
  );
};

export function encodedContactResponse({ name, email, subject, message, lang }){
  const language = getLanguage(lang);
  const content = language.content.layout.Email.ContactResponse;
  const props = { name, message, content };
  return encodeMessage({
    email,
    username: name,
    subject: `Re: ${subject}`,
    message: ReactDOMServer.renderToString(<ContactResponse {...props}/>)
  });
};
