import React from 'react';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.css'

import getServerData from 'util/getServerData';

function MyApp({ Component, pageProps }) {

  // initial load
  const [ load, setLoad ] = useState(true);
  getServerData(load ? '/api/user' : null);
  getServerData(load ? '/api/order' : null);
  getServerData(load ? '/api/posts' : null);
  getServerData(load ? '/api/products' : null);
  getServerData(load ? '/api/deliveries' : null);
  getServerData(load ? '/api/user/orders' : null);
  useEffect(() => {
    setLoad(false);
  }, []);

  return (
    <Component {...pageProps} />
  )
}

export default MyApp
