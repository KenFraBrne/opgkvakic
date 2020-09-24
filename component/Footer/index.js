import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {

  // navigation links
  const links = [
    {href: "/", text: "Naslovna"},
    {href: "/order", text: "Ponuda"},
    {href: "/about", text: "O nama"},
    {href: "/about/contact", text: "Kontaktirajte nas"},
    {href: "/login", text: "Login"},
  ];

  const navLinks = links.map(link => {
    const { href, text } = link;
    return (
      <Link key={href} href={href} passHref>
        <Nav.Link className="pl-0">{text}</Nav.Link>
      </Link>
    );
  });

  // contact links
  const contacts = [
    {
      text: "Struge I 7, 10000 Zagreb",
      href: "https://goo.gl/maps/GDL8JYSsuxmdJEqt9",
      rel: "noopener noreferrer",
      target: "_blank",
      icon: <FiMapPin />,
    },
    {
      text: "123456",
      href: "tel:123456",
      icon: <FiPhone />,
    },
    {
      text: "opgkvakic@gmail.com",
      href: "mailto:opgkvakic@gmail.com" ,
      icon: <FiMail />,
    }
  ];

  const navContacts = contacts.map(contact => {
    const { text, href, rel, target, icon } = contact;
    return (
      <Nav.Link href={href} rel={rel} target={target}>
        {icon} <br/> {text}
      </Nav.Link>
    )
  })

  return (
    <Container fluid className="bg-dark text-light pt-3">

      <Row>

        <Col sm>
          <Navbar variant="dark" className="justify-content-center">
            <Nav className="text-center text-lg-left flex-column">
              <Nav.Item className="pb-1">
                <b>Navigacija</b>
              </Nav.Item>
              {navLinks}
            </Nav>
          </Navbar>
        </Col>

        <Col sm>
          <Navbar variant="dark" className="justify-content-center">
            <Nav className="text-center flex-column">
              <Nav.Item className="pb-1">
                <b>Kontakt</b>
              </Nav.Item>
              {navContacts}
            </Nav>
          </Navbar>
        </Col>

      </Row>

    </Container>
  );
};

export default Footer;
