import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import MainLayout from 'layout/MainLayout'

import getServerData from 'util/getServerData';

const UserLayout = ({ children }) => {
  // language
  const { language } = useContext(LanguageContext);
  const content = language.content.layout.UserLayout;
  // load
  const router = useRouter();
  const { orders } = getServerData('/api/user/orders');
  const { products } = getServerData('/api/products');
  const { user, mutateUser } = getServerData('/api/user');
  const isLoading = products && orders ? false : true;
  // go to initial page when logged out
  const handleLogout = () => {
    fetch('/api/user/auth', {
      method: 'DELETE',
    }).then(() => {
      router.push('/');
      mutateUser();
    });
  };
  // navbar links
  const navbarLinks = [
    { href: "/user"},
    { href: "/user/orders"},
    { href: "#", onClick: handleLogout},
  ].map( ( link, ind ) => {
    const { href, onClick } = link;
    return (
      <Link
        key={ind}
        href={href}
        passHref>
        <Nav.Link onClick={onClick}>
          { content.navbarLinks[href] }
        </Nav.Link>
      </Link>
    )
  });
  // user navbar
  const userNavbar = (
    <Navbar
      bg="light"
      expand="sm"
      className="border-bottom border-dark"
      style={{fontSize: '110%'}}>
      <Nav>{ navbarLinks }</Nav>
    </Navbar>
  );
  // render
  return (
    <MainLayout isLoading={isLoading}>
      { !user ?
        <Container fluid className="text-center p-5">
          <h1>{ content.h1 }</h1>
        </Container> :
        <Container fluid>
          {userNavbar}
          <Container className="px-md-5">
            {children}
          </Container>
        </Container>
      }
    </MainLayout>
  );
};

export default UserLayout;
