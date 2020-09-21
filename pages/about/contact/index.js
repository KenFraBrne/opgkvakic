import React from 'react';

import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

import MainLayout from 'layout/MainLayout'

export default function ContactPage() {

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

  return (
    <MainLayout>

      <Container fluid style={{maxWidth: 800}}>

        <h1>Kontaktirajte nas</h1>

        <Row className="pt-3">

          <Col md={8} className="pt-2">
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group
                  className="col-md"
                  controlId="name">
                  <Form.Control
                    placeholder="Vaše ime"/>
                </Form.Group>
                <Form.Group
                  className="col-md"
                  controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Vaš email"/>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="subject">
                <Form.Control
                placeholder="Naslov poruke"/>
              </Form.Group>
              <Form.Group controlId="message">
                <Form.Control
                  as="textarea"
                  placeholder="Vaša poruka"/>
              </Form.Group>
              <Button type="submit">
                Pošaljite poruku
              </Button>
            </Form>
          </Col>
          <Col md={4}>
            <ul
              className="text-center"
              style={{listStyleType: 'none'}}>
              <li className="py-3">
                <a
                  href="https://goo.gl/maps/GDL8JYSsuxmdJEqt9"
                  rel="noopener noreferrer"
                  target="_blank">
                  <FiMapPin
                    size="1.5em"
                    className="mb-2"/>
                  <br/>
                  Struge I 7, 10000 Zagreb 
                </a>
              </li>
              <li className="py-3">
                <a href="tel:123456">
                  <FiPhone
                    size="1.5em"
                    className="mb-2"/>
                  <br/>
                  123456 
                </a>
              </li>
              <li className="py-3">
                <a href="mailto:opgkvakic@gmail.com">
                  <FiMail
                    size="1.5em"
                    className="mb-2"/>
                  <br/>
                  opgkvakic@gmail.com 
                </a>
              </li>
            </ul>
          </Col>

        </Row>

      </Container>

    </MainLayout>
  )
}
