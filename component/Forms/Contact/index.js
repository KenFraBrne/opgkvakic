import React from 'react';

import { useRouter } from 'next/router';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Contact({ language }){
  // language
  const content = language.content.component.Forms.Contact;
  // handle submit
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()){
      const body = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
        lang: language.lang,
      };
      fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      }).then(() => {
        router.replace('/');
      });
    };
  };
  // form rows
  const formRows = [
    { controlId: 'name', type: 'text'},
    { controlId: 'email', type: 'email' },
  ].map( row => {
    return (
      <Form.Group
        className="col-md"
        controlId={row.controlId}>
        <Form.Control
          type={row.type}
          placeholder={ content.formRows[row.controlId] }/>
      </Form.Group>
    )
  });
  // form groups
  const formGroups = [
    { controlId: 'subject', },
    { controlId: 'message', as: 'textarea' },
  ].map( group => {
    return (
      <Form.Group
        controlId={group.controlId}>
        <Form.Control
          type="text"
          as={group.as}
          placeholder={ content.formGroups[group.controlId] }/>
      </Form.Group>
    )
  });
  // render
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row> { formRows } </Form.Row>
      { formGroups }
      <Button type="submit">
        { content.button }
      </Button>
    </Form>
  )
}
