import React from 'react';

import Link from 'next/link';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';
import * as types from 'context/Language/types';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

import { FiShoppingCart } from 'react-icons/fi';

import getServerData from 'util/getServerData';

const MyNavbar = () => {
  
  // load user
  const { user } = getServerData('/api/user');
  
  // cart color depending on order products
  const { order } = getServerData('/api/order');
  const cartColor = order?.products?.reduce((tot, val) => tot+val.amount, 0) ? 'red' : 'inherit';

  // language change
  const { language, languageDispatch } = useContext(LanguageContext);
  const handleLanguageSelect = (lang) => {
    switch (lang){
      case "en": return languageDispatch({ type: types.SET_EN });
      case "fr": return languageDispatch({ type: types.SET_FR });
      default:   return languageDispatch({ type: types.SET_HR });
    };
  };

  // left nav links
  const navLinkLeft = [
    "/",
    "/order",
    "/posts",
  ].map( (link, ind) => {
    return (
      <Link key={ind} href={link} passHref>
        <NavLink>{language.content.component.Navbar.navLinkLeft[ind]}</NavLink>
      </Link>
    );
  });

  // dropdown links
  const dropdownLinks = [
    "/about",
    "/about/how",
    "/about/where",
    "/about/contact",
  ].map( (link, ind) => {
    return (
      <Link key={ind} href={link} passHref>
        <NavDropdown.Item>{language.content.component.Navbar.NavDropdown.Link[ind]}</NavDropdown.Item>
      </Link>
    );
  });

  return (

    <Navbar
      expand="md"
      variant="light"
      collapseOnSelect
      className="py-3"
      style={{fontSize: '110%'}}>

      <Link href="/" passHref>
        <Navbar.Brand>
          <h2>OPG Kvakić</h2>
        </Navbar.Brand>
      </Link>

      <NavbarToggle aria-controls="responsive-navbar-nav" />

      <NavbarCollapse>
        <Nav className="mr-auto align-items-left align-items-md-center px-4 px-md-0">

          {navLinkLeft}

          <NavDropdown title={language.content.component.Navbar.NavDropdown.title} id="nav-dropdown">
            {dropdownLinks}
          </NavDropdown>

          <NavDropdown
            id="nav-language"
            title={language.icon}
            onSelect={handleLanguageSelect}
            style={{ fontSize: "1.5em" }}>
            <NavDropdown.Item eventKey="hr"> 🇭🇷 Hrvatski </NavDropdown.Item>
            <NavDropdown.Item eventKey="en"> 🇬🇧 English </NavDropdown.Item>
            <NavDropdown.Item eventKey="fr"> 🇫🇷 Français </NavDropdown.Item>
          </NavDropdown>

        </Nav>
        <Nav>

          <Link href="/cart" passHref>
            <NavLink as="a" className="pl-4">
              <FiShoppingCart size="1.5em" color={cartColor}/>
            </NavLink>
          </Link>
          
          { user ? 
            <Link href="/user" passHref>
              <NavLink as="a" className="pl-4">
                {user.username}
              </NavLink>
            </Link> :
            <Link href="/login" passHref>
              <NavLink as="a" className="pl-4">
                {language.content.component.Navbar.navLinkRight}
              </NavLink>
            </Link> }

        </Nav>
      </NavbarCollapse>
    </Navbar>

  );
};

export default MyNavbar;
