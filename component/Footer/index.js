import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {

  const links = [
    {href: "/", text: "Naslovna"},
    {href: "/order", text: "Ponuda"},
    {href: "/about", text: "O nama"},
    {href: "/login", text: "Login"},
  ]

  return (
    <Container fluid className="d-flex flex-row border-top border-dark px-0 py-3">

      <Nav className="flex-shrink-1 d-flex flex-column px-5">
        <Nav.Item className="py-2">
          <b>Navigacija</b>
        </Nav.Item>
        {links.map(link => (
          <Link key={link.href} href={link.href} passHref>
            <Nav.Link className="px-0">
              {link.text}
            </Nav.Link>
          </Link>
        ))}
      </Nav>

      <Nav className="d-flex flex-column">

        <Nav.Item className="py-2">
          <b>Kontakt</b>
        </Nav.Item>

        <Nav.Item className="py-2">
          Tel. : 098 797 171
        </Nav.Item>

        <Nav.Item className="py-2">
          Adresa : <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://goo.gl/maps/hLfFkDV64KqsAFuP8"
            style={{textDecoration: 'none'}}>Struge I 7, Zagreb</a>
        </Nav.Item>

        <Nav.Item className="py-2">
          Email : <a 
            href="mailto:opgkvakic@gmail.com"
            style={{textDecoration: 'none'}}>opgkvakic@gmail.com</a>
        </Nav.Item>

      </Nav>

    </Container>
  );
};

export default Footer;
