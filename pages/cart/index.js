import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import MainLayout from 'layout/MainLayout';
import ProductSummary from 'component/ProductSummary';
import DatePicker from 'component/DatePicker';
import TimePicker from 'component/TimePicker';

import getServerData from 'util/getServerData';

const CartPage = () => {

  const { order, mutateOrder } = getServerData('/api/order');

  const [ deliveryDay, setDeliveryDay ] = useState(null);
  const [ errorMsg, setErrorMsg ] = useState(null);
  const router = useRouter();

  const handleOrder = () => {
    setErrorMsg(null);
    fetch('/api/user/orders', {
      method: 'POST',
    }).then(async res => {
      if (res.status === 200){
        router.push('/');
        mutateOrder();
      } else {
        const errorMsg = await res.text();
        setErrorMsg(errorMsg);
      };
    })
  };

  let body =
    <Container fluid style={{maxWidth: 650}}>
      <h1>Vaša narudžba</h1>
      <br/>
      <h4>Detalji:</h4>
      <ProductSummary order={order}/>
      <Container fluid className="d-flex px-0 py-2">
        <div className="h4 pr-3"> Dostava: </div>
        <div>
          <DatePicker
            setDeliveryDay={(date) => setDeliveryDay(date)}
            deliveryDay={deliveryDay}/>
        </div>
      </Container>
      <Container fluid className="d-flex px-0 py-2">
        <div className="h4 pr-3 my-auto">Vrijeme:</div>
        <div>
          <TimePicker deliveryDay={deliveryDay}/>
        </div>
      </Container>
      <Button
        className="my-3"
        variant="primary"
        disabled={!(order?.products && order?.delivery)}
        onClick={handleOrder}>
        Naručite
      </Button>
      <p className="text-danger">{errorMsg}</p>
    </Container>;

  // change body if order not defined
  if ( !order || order?.products && Object.keys(order.products).length === 0 ) {
    body =
      <Container fluid style={{maxWidth: 650}}>
        <h1>Vaša košarica je prazna</h1>
      </Container>;
  };

  return (
    <MainLayout>
      {body}
    </MainLayout>
  );
}

export default CartPage;
