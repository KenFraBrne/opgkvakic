import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import MainLayout from 'layout/MainLayout'

export default function HomePage() {

  const router = useRouter();
  const [ formValid, setFormValid ] = useState(false);
  const [ emailError, setEmailError ] = useState(null);
  const [ emailValid, setEmailValid ] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() !== false) {
      const body = {
        username: form.username.value,
        password: form.password.value,
        email: form.email.value,
      };
      const res = await fetch('/api/user/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      if (res.status !== 201){
        setEmailError(await res.text());
        setEmailValid(false);
        setFormValid(false);
        return;
      } else {
        router.push('/');
      };
    };

    if (form.email.value.length !== 0){
      setEmailError("Email nije dobar");
    } else {
      setEmailError("Email je prazan");
    };

    setFormValid(true);
  };

  return (
    <MainLayout>

      <Container fluid style={{maxWidth: 600, textAlign: 'justify'}}>

        <h1>Registracija</h1>

        <Form noValidate validated={formValid} onSubmit={handleSubmit}>

          <Form.Group controlId="username">
            <Form.Label>Korisničko ime</Form.Label>
            <Form.Control required type="text" placeholder="Upišite korisničko ime"/>
            <Form.Control.Feedback type="invalid">Korišničko ime je prazno</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email adresa</Form.Label>
            <Form.Control isInvalid={!emailValid} required type="email" placeholder="Upišite email"/>
            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control required type="password" placeholder="Upišite lozinku"/>
            <Form.Control.Feedback type="invalid">Lozinka je prazna</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="mr-3">
            Registriraj se
          </Button>

        </Form>

      </Container>

    </MainLayout>
  )
}
