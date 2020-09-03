import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import MainLayout from 'layout/MainLayout'

export default function HomePage() {

  const router = useRouter();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    };
    setValidated(true);
  };

  return (
    <MainLayout>

      <Container fluid style={{maxWidth: 600, textAlign: 'justify'}}>

        <h1>Prijava</h1>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email adresa</Form.Label>
            <Form.Control required type="email" placeholder="Upišite email"/>
            <Form.Control.Feedback type="invalid">Email nije dobar</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
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

      </Container>

    </MainLayout>
  )
}
