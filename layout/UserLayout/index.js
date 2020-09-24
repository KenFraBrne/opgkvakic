import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import MainLayout from 'layout/MainLayout'

import getServerData from 'util/getServerData';

const UserLayout = ({ children }) => {

  const router = useRouter();
  const { user, mutateUser } = getServerData('/api/user');

  // load user orders & products already
  getServerData('/api/user/orders');
  getServerData('/api/products');

  // go to initial page when logged out
  const handleLogout = () => {
    fetch('/api/user/auth', {
      method: 'DELETE',
    }).then( res => {
      mutateUser();
      router.push('/');
    });
  };

  const userNavbar =
    <Navbar
      bg="light"
      expand="sm"
      className="border-bottom border-dark"
      style={{fontSize: '110%'}}>
      <Nav>
        <Link href="/user" passHref>
          <Nav.Link>Informacije</Nav.Link>
        </Link>
        <Link href="/user/orders" passHref>
          <Nav.Link>Narudžbe</Nav.Link>
        </Link>
        <Nav.Link href="\\" onClick={handleLogout}>Odjava</Nav.Link>
      </Nav>
    </Navbar>;

  const userPage = 
    <Container fluid>
      {userNavbar}
      {children}
    </Container>

  return (
    <MainLayout>
      { !user ? <h1> You are not authenticated </h1> : userPage }
    </MainLayout>
  );
};

export default UserLayout;
