import React, { useContext } from 'react';

import { OrderContext } from 'context/Order';

import Head from 'next/head';
import Link from 'next/link';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

import { FiShoppingCart } from 'react-icons/fi';

const MojNavbar = (props) => {

  const {order, orderDispatch} = useContext(OrderContext);

  // cart color
  const amount = 
    Object.keys(order.products).length > 0 ?
    Object.values(order.products).reduce((tot, val) => tot+ +val, 0) :
    0;
  const cartColor = amount>0 ? "red" : "inherit";

  return (

    <Navbar
      expand="sm"
      collapseOnSelect
      className="border-bottom border-dark"
      style={{fontSize: '120%'}}>

      <Link href="/" passHref>
        <Navbar.Brand>
          <img src="/icons8-farm-64.png" height={40}/>{' '}
          OPG Kvakić
        </Navbar.Brand>
      </Link>

      <NavbarToggle aria-controls="responsive-navbar-nav" />

      <NavbarCollapse>
        <Nav className="mr-auto">

          <Link href="/" passHref>
            <NavLink>Naslovna</NavLink>
          </Link>

          <Link href="/order" passHref>
            <NavLink>Ponuda</NavLink>
          </Link>

          <Link href="/news" passHref>
            <NavLink>Novosti</NavLink>
          </Link>

          <NavDropdown title="O nama" id="nav-dropdown">

            <Link href="/about/who" passHref>
              <NavDropdown.Item>Tko smo</NavDropdown.Item>
            </Link>

            <Link href="/about/how" passHref>
              <NavDropdown.Item>Dostave</NavDropdown.Item>
            </Link>

            <Link href="/about/where" passHref>
              <NavDropdown.Item>Kako do nas?</NavDropdown.Item>
            </Link>

            <Link href="/about/contact" passHref>
              <NavDropdown.Item>Kontakt</NavDropdown.Item>
            </Link>

          </NavDropdown>

        </Nav>
        <Nav>

          <Link href="/order/cart" passHref>
            <NavLink as="a" className="pr-4">
              <FiShoppingCart size="1.5em" color={cartColor}/>
            </NavLink>
          </Link>

          <Link href="/login" passHref>
            <NavLink as="a" className="pr-3">Login </NavLink>
          </Link>

        </Nav>
      </NavbarCollapse>
    </Navbar>

  );
};

export default MojNavbar;
