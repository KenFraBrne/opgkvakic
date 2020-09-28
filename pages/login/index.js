import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import MainLayout from 'layout/MainLayout'

import getServerData from 'util/getServerData';

export default function HomePage() {

  // language change
  const { language } = useContext(LanguageContext);
  const content = language.content.pages.login;

  // handle error message
  const router = useRouter();
  const { mutateUser } = getServerData('/api/user');
  const [ errorMsg, setErrorMsg ] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const body = {
        password: form.password.value,
        email: form.email.value,
      };
      const res = await fetch('/api/user/auth', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      if (res.status === 200){
        const user = await res.json().then(res => res?.user);
        delete user.password;
        mutateUser({ user });
        router.back();
      } else {
        setErrorMsg(content.setErrorMsg);
      };
    };
  };

  // form groups
  const formGroups = [
    "email",
    "password",
  ].map( (group, ind) => {
    return (
      <Form.Group
        key={ind}
        controlId={group}
        onChange={() => setErrorMsg(null)}>
        <Form.Label>{ content.FormLabel[ind] }</Form.Label>
        <Form.Control
          required
          type={group}
          placeholder={ content.FormPlaceholder[ind] }/>
        <Form.Control.Feedback type="invalid">{ content.FormFeedback[ind] }</Form.Control.Feedback>
      </Form.Group>
    )
  });

  return (
    <MainLayout>
      <Container fluid style={{maxWidth: 600, textAlign: 'justify'}}>
        <h1>{ content.h1 }</h1>
        <Form noValidate onSubmit={handleSubmit}>
          { formGroups }
          <Button variant="primary" type="submit" className="mr-3">
            { content.Button[0] }
          </Button>
          <Button variant="secondary" onClick={() => router.push('/signup')}>
            { content.Button[1] }
          </Button>
        </Form>
        <p className="text-danger py-3">{errorMsg}</p>
      </Container>
    </MainLayout>
  )
}
