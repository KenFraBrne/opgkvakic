import React, { useContext, useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { OrderContext } from 'context/Order';
import * as types from 'context/Order/types';

import Container from 'react-bootstrap/Container';

import Navbar from 'component/Navbar';
import Footer from 'component/Footer';

const MainLayout = ({children}) => {

  // order context
  const { order, orderDispatch } = useContext(OrderContext);

  // load local order
  useEffect(() => {
    const localOrderJSON = localStorage.getItem('localOrder');
    const localOrder = JSON.parse(localOrderJSON);
    if (localOrder) {
      orderDispatch({
        type: types.SET_ORDER,
        localOrder: localOrder,
      });
    };
  }, []);

  // save order locally when changed
  useEffect(() => {
    const localOrderJSON = JSON.stringify(order)
    localStorage.setItem('localOrder', localOrderJSON);
  }, [order]);

  return (
    <Container fluid className="d-flex flex-column h-100 p-0">

      <Head>
        <title>OPG Kvakić</title>
        <link rel="icon" href="/icons8-farm-64.png" />
      </Head>

      <Navbar/>

      <Container fluid className="flex-grow-1 py-3">
        {children}
      </Container>

      <Footer />

    </Container>
  );
};

export default MainLayout;