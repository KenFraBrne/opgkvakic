import React from 'react';
import ReactDOMServer from 'react-dom/server';

import ProductSummary from 'component/ProductSummary';

import getLanguage from 'util/getLanguage';
import encodeMessage from 'util/encodeMessage';
import fromUntilString from 'util/fromUntilString';

function OrderConfirm({ language, content, dateString, username, delivery, order, products }){
  const timeString = fromUntilString({ delivery, lang: language.lang });
  return (
    <div>
      <p> { content.p[0].replace('username', username)} </p>
      <p> { content.p[1] } </p>
      <p> { content.p[2].replace('dateString', dateString).replace('timeString', timeString) } </p>
      <p> { content.p[3] } </p>
      <p> OPG Kvakić </p>
      <ProductSummary {...{ order, products, language }}/>
    </div>
  );
};

export function encodedOrderConfirm({ lang, user, order, delivery, products }){
  const { email, username } = user;
  const language = getLanguage(lang);
  const content = language.content.layout.Email.OrderConfirm;
  const dateString = delivery.from.toLocaleDateString(language.lang);
  const subject = content.subject.replace('dateString', dateString);
  const props = { language, content, dateString, username, delivery, order, products };
  const message = ReactDOMServer.renderToString(<OrderConfirm {...props}/>);
  return encodeMessage({ email, username, subject, message });
};
