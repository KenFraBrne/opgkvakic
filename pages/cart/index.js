import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import MainLayout from 'layout/MainLayout';
import ProductSummary from 'component/ProductSummary';
import DatePicker from 'component/DatePicker';
import TimePicker from 'component/TimePicker';

import getServerData from 'util/getServerData';

const CartPage = () => {

  // order
  const { order } = getServerData('/api/order');

  // delivery date state
  const [ deliveryDay, setDeliveryDay ] = useState(null);

  // body
  let body =
    <Container fluid style={{maxWidth: 650}}>

      <h1> Vaša narudžba </h1>

      <br/>

      <h4> Detalji: </h4>

      <ProductSummary />

      <Container fluid className="d-flex px-0 py-2">
        <div className="h4 pr-3"> Dostava: </div>
        <div>
          <DatePicker
            setDeliveryDay={(date) => setDeliveryDay(date)}
            deliveryDay={deliveryDay}/>
        </div>
      </Container>

      <Container fluid className="d-flex px-0 py-2">
        <div className="h4 pr-3">Vrijeme:</div>
        <div>
          <TimePicker deliveryDay={deliveryDay}/>
        </div>
      </Container>

      <Button
        disabled
        variant="primary"
        size="lg"
        className="my-3">
        Naručite
      </Button>

    </Container>;

  // change body if order not defined
  if ( order?.products && Object.keys(order.products).length === 0 ) {
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

export default CartPage;
