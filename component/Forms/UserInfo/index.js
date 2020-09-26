import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UserInfo({ user, mutateUser, setShow }){

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
    { key: 'username', text: 'Korisničko ime', readOnly: true },
    { key: 'email', text: 'Email', readOnly: true },
    { key: 'first', text: 'Ime'},
    { key: 'last', text: 'Prezime' },
    { key: 'address', text: 'Adresa' },
    { key: 'telephone', text: 'Broj mobitela ili telefona' },
  ].map(group =>
    <Form.Group
      as={Row}
      key={group.key}
      controlId={group.key}>
      <Form.Label column className="font-weight-bold">
        {group.text}
      </Form.Label>
      <Col sm="10">
        <Form.Control
          type={group?.type}
          plaintext={group?.readOnly}
          readOnly={group?.readOnly}
          defaultValue={user?.[group.key]}/>
      </Col>
    </Form.Group>
  );

  // render
  return (
    <Form onSubmit={handleFormSubmit}>

      {formGroups}

      <Button
        type="submit"
        variant="primary"
        className="m-1">
        Izmjeni podatke
      </Button>

      <Button
        variant="danger"
        className="m-1"
        onClick={() => setShow(true)}>
        Izbriši korisnika
      </Button>

    </Form>
  )
}

export default UserInfo;
