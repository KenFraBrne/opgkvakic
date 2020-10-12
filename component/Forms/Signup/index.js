import React, { useState, useEffect } from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Signup({ setStatus }){

  // language change
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Forms.Signup;

  // form group control ids
  const controlIds = [
    'username',
    'password',
    'email',
  ];

  // form group states
  const initGroups = controlIds.map( controlId => {
    return {
      controlId,
      isInvalid: false,
      feedback: content.formGroups[controlId].feedback.empty,
    }
  });
  const [ groups, setGroups ] = useState(initGroups);

  // handle control change
  const handleControlChange = (controlId) => {
    const group = groups.find( group => group.controlId === controlId );
    group.isInvalid = false;
    setGroups([
      ...groups.filter( group => group.controlId !== controlId ),
      group,
    ]);
  };

  // form groups
  const formGroups = controlIds.map( controlId => {
    const { placeholder, label } = content.formGroups[controlId];
    const { isInvalid, feedback } = groups.find( group => group.controlId === controlId );
    const type = controlId === 'password' ? controlId : 'text';
    return (
      <Form.Group {...{
        key: controlId,
        controlId
        }}>
        <Form.Label> { label } </Form.Label>
        <Form.Control {...{
          type,
          isInvalid,
          placeholder,
          required: true,
          onChange: () => handleControlChange(controlId),
        }}/>
        <Form.Control.Feedback type="invalid"> { feedback } </Form.Control.Feedback>
      </Form.Group>
    )
  });

  // form valid state
  const [ formValid, setFormValid ] = useState(false);

  // handle group feedback
  const handleFeedback = (controlId, key) => {
    const group = groups.find( group => group.controlId === controlId );
    group.isInvalid = true;
    group.feedback = content.formGroups[controlId].feedback[key];
    setGroups([
      ...groups.filter( group => group.controlId !== controlId ),
      group,
    ]);
  };

  // handle form submit
  const handleFormSubmit = async (event) => {
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
          setFormValid(true);
          return;
        case 400: // Email not good
        case 403: // Email exists
        default:
          handleFeedback('email', res.status);
          setFormValid(false);
          return;
      };
    // if form nok
    } else {
      // email length error message
      if (form.email.value.length > 0) handleFeedback('email', 400);
      else handleFeedback('email', 'empty');
      setFormValid(true);
    };
  };

  // render
  return (
    <Form
      noValidate
      validated={formValid}
      onSubmit={handleFormSubmit}>
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
