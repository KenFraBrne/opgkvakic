import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Signup({ language, setStatus }){

  // language change
  const content = language.content.component.Forms.Signup;

  // handle form submit
  const router = useRouter();
  const [ formValid, setFormValid ] = useState(false);
  const [ emailError, setEmailError ] = useState(null);
  const [ emailValid, setEmailValid ] = useState(true);

  // change email error with language change
  useEffect(() => {

  }, [language])

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
        lang: language.lang,
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
          setTimeout(() => setStatus(res.status), 500);
          setEmailValid(true);
          setFormValid(true);
          return;
        case 400: // Email not good
        case 403: // Email exists
          setEmailError(res.status);
          setEmailValid(false);
          setFormValid(false);
          return;
      };
    } else {
      // email length error message
      if (form.email.value.length > 0) setEmailError( content.setEmailError[400] );
      else setEmailError( content.setEmailError.empty );
      setFormValid(true);
    };
  };

  // form groups
  const formGroups = [
    { type: 'text', controlId: 'username' },
    { type: 'email', controlId: 'email', isInvalid: !emailValid },
    { type: 'password', controlId: 'password' },
  ].map( group => {
    const { type } = group;
    return (
      <Form.Group
        key={type}
        controlId={group.controlId}>
        <Form.Label>{ content.formGroups[type].label }</Form.Label>
        <Form.Control
          required
          type={ group.type }
          isInvalid={ group?.isInvalid }
          placeholder={ content.formGroups[type].placeholder }/>
        <Form.Control.Feedback type="invalid">
          { type === 'email' ?
              content.emailError[emailError] :
              content.formGroups[type].feedback }
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
        { content.Button }
      </Button>
    </Form>
  )
}
