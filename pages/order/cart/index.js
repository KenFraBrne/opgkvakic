import React, { useContext, useState, useEffect } from 'react';

import { OrderContext } from 'context/Order';
import * as actions from 'context/Order/actions';
import * as types from 'context/Order/types';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import MainLayout from 'layout/MainLayout';
import ProductSummary from 'component/ProductSummary';
import DatePicker from 'component/DatePicker';
import TimePicker from 'component/TimePicker';

const CartPage = ({products, deliveries}) => {

  // order context
  const { order } = useContext(OrderContext);

  // delivery date state
  const [ deliveryDay, setDeliveryDay ] = useState(null);

  // body
  let body =
    <Container fluid style={{maxWidth: 650}}>
      <h1> Vaša narudžba </h1>
      <br/>
      <h4> Detalji: </h4>
      <ProductSummary products={products}/>

      <Container fluid className="d-flex px-0 py-2">
        <div className="h4 pr-3"> Dostava: </div>
        <div>
          <DatePicker
            setDeliveryDay={(date) => setDeliveryDay(date)}
            deliveryDay={deliveryDay}
            deliveries={deliveries}/>
        </div>
      </Container>

      <Container fluid className="d-flex px-0 py-2">
        <div className="h4 pr-3">Vrijeme:</div>
        <div>
          <TimePicker
            deliveryDay={deliveryDay}
            deliveries={deliveries}/>
        </div>
      </Container>

      <Button variant="primary" size="lg" className="my-3">
        Naručite
      </Button>

    </Container>;

  // body if order not defined
  if ( Object.keys(order.products).length === 0 ) {
    body =
      <Container fluid style={{maxWidth: 650}}>
        <h1> Košarica prazna </h1>
      </Container>;
  };

  return (
    <MainLayout>
      {body}
    </MainLayout>
  );
}

export async function getServerSideProps(){
  let products = await require('data/products.json');
  let deliveries = await require('data/deliveries.json');
  return {
    props: {
      products: products,
      deliveries: deliveries,
    }
  }
}

export default CartPage;
