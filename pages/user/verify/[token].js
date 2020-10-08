import React from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import nextConnect from 'next-connect';
import database from 'middleware/database';

import Container from 'react-bootstrap/Container';

import MainLayout from 'layout/MainLayout';

function VerifyUser({ success }){
  // language
  const { language } = useContext(LanguageContext);
  const content = language.content.pages.user.verify;
  // render
  return (
    <MainLayout>
      <Container className="p-5">
        <h1> {content.h1} </h1>
        { success ?
          <p> {content.p.ok} </p> :
          <p> {content.p.nok} </p> }
      </Container>
    </MainLayout>
  );
};

export async function getServerSideProps(context){
  // add database to the request
  const handler = nextConnect();
  handler.use(database);
  await handler.apply(context.req, context.res);
  // search user
  const { token } = context.query;
  const success = await context.req.db
    .collection('users')
    .updateOne({
      verified: { $eq: false },
      verifyToken: token,
    },{
      $set: { verified: true },
      $unset: { verifyToken: 1 },
    })
    .then(ret => ret.result.n);
  return {
    props: { success },
  }
};

export default VerifyUser;
