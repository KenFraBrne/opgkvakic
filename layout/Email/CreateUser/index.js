import React from 'react';
import ReactDOMServer from 'react-dom/server';

import encodeMessage from 'util/encodeMessage';

export function CreateUser({ username, req, verifyToken }){
  const aHref = `${req.headers.origin}/user/verify/${verifyToken}`;
  const aElem = <a href={aHref}> ovaj link </a>;
  return (
    <div>
      <p> Draga/Dragi {username} </p>
      <p> Hvala vam što ste nam se pridužili 😉 </p>
      <p> Kako bi aktivirali vaš korišnički račun i omogučili naručivanje, molimo vas da kliknete {aElem} </p>
      <p> Do skora 👋 </p>
      <p> OPG Kvakić </p>
    </div>
  );
};

export function encodedCreateUser({ username, email, req, verifyToken }){
  const subject = 'Dobrodošli!';
  const props = { username, req, verifyToken };
  const message = ReactDOMServer.renderToString(<CreateUser {...props}/>);
  return encodeMessage({ email, username, subject, message });
};
