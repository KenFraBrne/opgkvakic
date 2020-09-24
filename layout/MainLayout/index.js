import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';

import Navbar from 'component/Navbar';
import Footer from 'component/Footer';

const MainLayout = ({children}) => {

  return (
    <Container fluid className="d-flex flex-column h-100 p-0">

      <Head>
        <title>OPG Kvakić</title>
        <link rel="icon" href="/icons8-farm-64.png" />
      </Head>

      <Navbar/>

      <Container fluid className="flex-grow-1 p-0">
        {children}
      </Container>

      <Footer/>

    </Container>
  );
};

export default MainLayout;
