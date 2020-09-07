import React, { useContext, useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import _ from 'lodash';

import { OrderContext } from 'context/Order';
import * as types from 'context/Order/types';

import Container from 'react-bootstrap/Container';

import Navbar from 'component/Navbar';
import Footer from 'component/Footer';

const MainLayout = ({children}) => {

  // order context
  const { order, orderDispatch } = useContext(OrderContext);

  // load order
  useEffect(() => {
    fetch('/api/order').then(res => {
      res.json().then(res => {
        console.log('order loaded');
        if (!_.isEmpty(res) && !_.isEqual(order, res)) {
          console.log('order dispatched');
          orderDispatch({
            type: types.SET_ORDER,
            savedOrder: res,
          });
        };
      });
    });
  }, []);

  // save order when changed
  useEffect(() => {
    fetch('/api/order', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(order),
    }).then(res => {
      console.log('order sent');
    });
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

      {/* <Footer /> */}

    </Container>
  );
};

export default MainLayout;
