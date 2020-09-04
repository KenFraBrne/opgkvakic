import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import MainLayout from 'layout/MainLayout'

export default function HomePage() {

  const router = useRouter();

  const [ errorMsg, setErrorMsg ] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() !== false) {
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
        router.push('/');
      } else {
        setErrorMsg("Email ili lozinka su pogrešni")
      };
    };
  };

  return (
    <MainLayout>

      <Container fluid style={{maxWidth: 600, textAlign: 'justify'}}>

        <h1>Prijava</h1>


        <Form noValidate onSubmit={handleSubmit}>

          <Form.Group controlId="email" onChange={() => setErrorMsg(null)}>
            <Form.Label>Email adresa</Form.Label>
            <Form.Control required type="email" placeholder="Upišite email"/>
            <Form.Control.Feedback type="invalid">Email nije dobar</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password" onChange={() => setErrorMsg(null)}>
            <Form.Label>Lozinka</Form.Label>
            <Form.Control required type="password" placeholder="Upišite lozinku"/>
            <Form.Control.Feedback type="invalid">Lozinka je prazna</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="mr-3">
            Prijavi se
          </Button>

          <Button variant="secondary" onClick={() => router.push('/signup')}>
            Registriraj se
          </Button>

        </Form>

        <p className="text-danger py-3">{errorMsg}</p>

      </Container>

    </MainLayout>
  )
}
