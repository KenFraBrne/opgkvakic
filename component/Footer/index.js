import React from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Head from 'next/head';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer(){
  // language
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Footer;
  // navigation links
  const links = [
    "/",
    "/order",
    "/about",
    "/about/contact",
    "/login",
  ];
  const navLinks = links.map( link => {
    const className = [
      "text-center",
      "text-md-left",
      "pl-0",
    ].join(' ');
    return (
      <Link key={link} href={link} passHref>
        <Nav.Link {...{ className }}>
          { content.links[link] }
        </Nav.Link>
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
      <Nav.Link
        rel={rel}
        key={href}
        href={href}
        target={target}
        className="text-center">
        {icon} <br/> {text}
      </Nav.Link>
    )
  })
  // navbar cols
  const navbarCols = [
    navLinks,
    navContacts,
  ].map( ( navbar, ind ) => {
    const className = [
      "pb-1",
      ind === 1 ? 'text-center' : "text-center text-md-left",
    ].join(' ');
    return (
      <Col key={ind} sm>
        <Navbar variant="dark" className="justify-content-center">
          <Nav className="mx-auto flex-column">
            <Nav.Item {...{ className }}>
              <b>{ content.b[ind] }</b>
            </Nav.Item>
            { navbar }
          </Nav>
        </Navbar>
      </Col>
    );
  });
  // render
  return (
    <Container fluid className="bg-dark text-light pt-3">
      <Row> {navbarCols} </Row>
    </Container>
  );
};
