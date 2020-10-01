import React from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UserInfo({ user, mutateUser, setShow }){
  // language
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Forms.UserInfo;
  // form submit handler
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // create update body
    const form = event.currentTarget;
    const body = {
      first: form.first.value,
      last: form.last.value,
      address: form.address.value,
      telephone: form.telephone.value,
    };
    // remove empty values
    Object.keys(body).forEach(key => {
      if (body[key] === "") delete body[key]
    });
    // update
    fetch('/api/user/update', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }).then(res => {
      res.json()
        .then(res => {
          // change existing user
          mutateUser({ user: res.user });
        });
    });
  };
  // form groups
  const formGroups = [
    { key: 'username', readOnly: true },
    { key: 'email', readOnly: true },
    { key: 'first' },
    { key: 'last' },
    { key: 'address' },
    { key: 'telephone'},
  ].map(group => {
    const { key, readOnly } = group;
    return (
      <Form.Group
        as={Row}
        key={key}
        controlId={key}>
        <Form.Label
          column
          className="font-weight-bold">
          { content.formGroups[key] }
        </Form.Label>
        <Col sm="10">
          <Form.Control
            readOnly={readOnly}
            plaintext={readOnly}
            defaultValue={user?.[key]}/>
        </Col>
      </Form.Group>
    )
  });
  // render
  return (
    <Form onSubmit={handleFormSubmit}>
      {formGroups}
      <Button
        type="submit"
        variant="primary"
        className="m-1">
        { content.Button[0] }
      </Button>
      <Button
        variant="danger"
        className="m-1"
        onClick={() => setShow(true)}>
        { content.Button[1] }
      </Button>
    </Form>
  )
}

export default UserInfo;
