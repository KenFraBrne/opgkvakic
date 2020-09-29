import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';

import MainLayout from 'layout/MainLayout'
import SignupForm from 'component/Forms/Signup';

export default function HomePage() {

  // change language
  const { language } = useContext(LanguageContext);
  const content = language.content.pages.signup;

  // status
  const router = useRouter();
  const [ status, setStatus ] = useState(null);
  const getStatus = (status) => {
    switch(status) {
      case 201: // OK
      case 511: // Signup required
        setTimeout(() => router.replace('/'), 3000);
        return (
          <Container>
            { content.status[201].p.map( ( line, ind ) => <p key={ind}>{line}</p> ) }
          </Container>
        );
      case 500: // Registration error
        const aElem = <a href="\\" onClick={() => setStatus(null)}> { content.status[500].a } </a>;
        return (
          <Container>
            <p> { content.status[500].p[0] } </p>
            <p> { content.status[500].p[1] } { aElem }  </p>
          </Container>
        );
      case 503: // Verification email error
        return (
          <Container>
            { content.status[503].p.map( ( line, ind ) => <p key={ind}>{line}</p> ) }
          </Container>
        );
      default:
        return;
    }
  };
  const statusContainer = (
    <Container className="px-0 py-3">
      { getStatus(status) }
    </Container>
  );

  // render
  return (
    <MainLayout>
      <Container fluid className="py-3" style={{maxWidth: 600, textAlign: 'justify'}}>
        <h1> { content.h1 } </h1>
        { status ?
            statusContainer :
            <SignupForm {...{ language, setStatus }}/> }
      </Container>
    </MainLayout>
  )
}
