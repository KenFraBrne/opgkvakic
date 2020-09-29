import React from 'react';
import ReactDOMServer from 'react-dom/server';

import getLanguage from 'util/getLanguage';
import encodeMessage from 'util/encodeMessage';

export function CreateUser({ username, content, req, verifyToken }){
  const aHref = `${req.headers.origin}/user/verify/${verifyToken}`;
  const aElem = <a href={aHref}> { content.a } </a>;
  return (
    <div>
      <h1> { content.subject } </h1>
      <p> { content.p[0] } {username} </p>
      <p> { content.p[1] } </p>
      <p> { content.p[2] } {aElem} </p>
      <p> { content.p[3] } </p>
      <p> OPG Kvakić  </p>
    </div>
  );
};

export function encodedCreateUser({ username, lang, email, req, verifyToken }){
  const language = getLanguage(lang);
  const content = language.content.layout.Email.CreateUser;
  const subject = content.subject;
  const props = { username, content, req, verifyToken };
  const message = ReactDOMServer.renderToString(<CreateUser {...props}/>);
  return encodeMessage({ email, username, subject, message });
};
