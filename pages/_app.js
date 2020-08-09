import React from 'react';

import { OrderProvider } from 'context/Order';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <OrderProvider>
      <Component {...pageProps} />
    </OrderProvider>
  )
}

export default MyApp
