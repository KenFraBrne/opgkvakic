import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';

import MainLayout from 'layout/MainLayout'
import SignupForm from 'component/Forms/Signup';

export default function HomePage() {

  // success
  const router = useRouter();
  const [ success, setSuccess ] = useState(null);
  const getSuccess = (success) => {
    switch(success) {
      case 201: // OK
      case 511: // Signup required
        setTimeout(() => router.replace('/'), 2000);
        return (
          <Container>
            <p> Dobrodošli! </p>
            <p> Molimo vas da provjerite svoj email i aktivirate svoj račun. </p>
          </Container>
        );
      case 500: // Registration error
        return (
          <Container>
            <p> Došlo je do greške pri stvaranju vašeg računa... </p>
            <p> Molimo vas da probate <a href="\\" onClick={() => setSuccess(null)}> ponovo </a> </p>
          </Container>
        );
      case 503: // Verification email error
        return (
          <Container>
            <p> Korisnički račun je kreiran ali izgleda da mail potvrde nije poslan... </p>
            <p> Molimo vas da nas kontaktirate za aktivaciju vašeg računa </p>
          </Container>
        );
      default:
        return;
    }
  };
  const sucessContainer = (
    <Container className="px-0 py-3">
      { getSuccess(success) }
    </Container>
  );

  // render
  return (
    <MainLayout>
      <Container fluid className="py-3" style={{maxWidth: 600, textAlign: 'justify'}}>
        <h1> Registracija </h1>
        { success ?
            sucessContainer :
            <SignupForm {...{ setSuccess }}/> }
      </Container>
    </MainLayout>
  )
}
