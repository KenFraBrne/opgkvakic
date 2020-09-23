import React from 'react';

import nextConnect from 'next-connect';
import database from 'middleware/database';

import Container from 'react-bootstrap/Container';

import MainLayout from 'layout/MainLayout';

function VerifyUser({ success }){
  return (
    <MainLayout>
      <Container className="p-5">
        <h1> Registracija </h1>
        { success ?
          <p> Hvala vam na potvrdi vaše email adrese  </p> :
          <p> Link za potvrdu više ne važi. </p>
        }
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
