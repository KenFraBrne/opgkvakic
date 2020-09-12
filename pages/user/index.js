import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import UserLayout from 'layout/UserLayout'

import getServerData from 'util/getServerData';

const UserPage = () => {

  const { user, mutateUser } = getServerData('/api/user');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const body = {
      first: form.first.value,
      last: form.last.value,
      address: form.address.value,
      telephone: form.telephone.value,
    };
    Object.keys(body).forEach(key => {
      if (body[key] === "") delete body[key]
    });
    fetch('/api/user/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }).then(res => {
      console.log('update poslan')
    });
  };

  const infoOrder = [
    { key: 'username', text: 'Korisničko ime', readOnly: true },
    { key: 'email', text: 'Email', readOnly: true },
    { key: 'first', text: 'Ime'},
    { key: 'last', text: 'Prezime' },
    { key: 'address', text: 'Adresa' },
    { key: 'telephone', text: 'Broj mobitela ili telefona' },
  ];

  const userInfo = user?.username &&
    <Form onSubmit={handleFormSubmit}>
      {infoOrder.map(info => (
        <Form.Group
          as={Row}
          key={info.key}
          controlId={info.key}>
          <Form.Label column className="font-weight-bold">
            {info.text}
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type={info?.type}
              plaintext={info?.readOnly}
              readOnly={info?.readOnly}
              defaultValue={user?.[info.key]}/>
          </Col>
        </Form.Group>
      ))}

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

    </Form>;

  const [ show, setShow ] = useState(false);
  const router = useRouter();

  const handleModalButton = async (isDelete) => {
    if (isDelete){
      await fetch('/api/user/update', { method: 'DELETE' });
      mutateUser();
      router.push('/');
    };
    setShow(false);
  };

  const modal = 
    <Modal
      centered
      show={show}
      backdrop="static"
      onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Izbriši korisnika</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Jeste li sigurni da želite izbrisati vaš korisnički račun?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="light"
          onClick={() => handleModalButton(false)}>
          Ne
        </Button>
        <Button
          variant="danger"
          onClick={() => handleModalButton(true)}>
          Da
        </Button>
      </Modal.Footer>
    </Modal>;

  return (
    <UserLayout>
      <Container fluid className="py-2 px-3">
        {userInfo}
      </Container>
      {modal}
    </UserLayout>
  );
};

export default UserPage;
