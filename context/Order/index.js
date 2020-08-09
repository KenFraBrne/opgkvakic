import React, { createContext, useReducer } from 'react';

import reducer from './reducer.js';

const OrderContext = React.createContext({});

const OrderProvider = ({children}) => {

  const initialOrder = {
    products: {},
    delivery: null,
  };

  const resetOrder = () => {
    return initialOrder;
  };

  const [order, orderDispatch] = useReducer(reducer, initialOrder, resetOrder);

  return (
    <OrderContext.Provider value={ { order, orderDispatch } }>
      {children}
    </OrderContext.Provider>
  )
}

export { OrderContext, OrderProvider };
