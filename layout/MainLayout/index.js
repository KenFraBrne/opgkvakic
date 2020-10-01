import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import Navbar from 'component/Navbar';
import Footer from 'component/Footer';

const MainLayout = (props) => {

  const { children, isLoading } = props;

  const spinner = 
    <Container className="p-5 d-flex justify-content-center">
      <Spinner
        animation="border"
        style={{
          width: '15vh',
          height: '15vh',
        }}/>
    </Container>;

  return (
    <Container fluid className="d-flex flex-column h-100 p-0">

      <Head>
        <title>OPG Kvakić</title>
        <link rel="icon" href="/icons8-farm-64.png" />
      </Head>

      <Container fluid className="p-0">
        <Navbar/>
      </Container>

      <Container fluid className="flex-grow-1 px-0 py-2">
        { isLoading ? spinner : children }
      </Container>

      <Footer/>

    </Container>
  );
};

export default MainLayout;
