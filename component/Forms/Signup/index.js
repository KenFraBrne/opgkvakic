import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Signup({ setSuccess }){

  // handle form submit
  const router = useRouter();
  const [ formValid, setFormValid ] = useState(false);
  const [ emailError, setEmailError ] = useState(null);
  const [ emailValid, setEmailValid ] = useState(true);

  // handleChange
  const handleChange = () => {
    setFormValid(false);
    setEmailValid(true);
  };

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    // if form ok
    if (form.checkValidity()) {
      // post info
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
      // resolve based on status
      switch (res.status) {
        case 201: // OK
        case 500: // Registration error
        case 503: // Verification email error
        case 511: // Signup required
          setTimeout(() => setSuccess(res.status), 500);
          setEmailValid(true);
          setFormValid(true);
          return;
        case 400: setEmailError('Email nije dobar'); break; // Email not good
        case 403: setEmailError('Email vec postoji'); break; // Email exists
      };
      setEmailValid(false);
      setFormValid(false);
      return;
    } else {
      // email length error message
      if (form.email.value.length > 0) setEmailError('Email nije dobar');
      else setEmailError('Email je prazan');
      setFormValid(true);
    };
  };

  // form groups
  const formGroups = [
    {
      type: 'text',
      controlId: 'username',
      label: 'Korisničko ime',
      placeholder: "Upišite vaše korisničko ime",
      feedback: "Korisničko ime je prazno",
    },
    {
      type: 'email',
      controlId: 'email',
      label: 'Email adresa',
      placeholder: "Upišite vaš email",
      isInvalid: !emailValid,
    },
    {
      type: 'password',
      controlId: 'password',
      label: 'Lozinka',
      placeholder: "Upišite vašu lozinku",
      feedback: "Lozinka je prazna",
    }
  ].map( group => {
    const { type } = group;
    return (
      <Form.Group
        key={type}
        controlId={group.controlId}>
        <Form.Label>{ group.label }</Form.Label>
        <Form.Control
          required
          type={ group.type }
          isInvalid={ group?.isInvalid }
          placeholder={ group.placeholder }/>
        <Form.Control.Feedback type="invalid">
          { type === 'email' ?  emailError : group.feedback }
        </Form.Control.Feedback>
      </Form.Group>
    )
  });

  return (
    <Form
      noValidate
      validated={formValid}
      onSubmit={handleSubmit}
      onChange={handleChange}>
      { formGroups }
      <Button
        type="submit"
        variant="primary"
        className="mr-3">
        Registriraj se
      </Button>
    </Form>
  )
}
