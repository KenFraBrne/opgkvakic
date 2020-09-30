import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import MainLayout from 'layout/MainLayout';
import ProductSummary from 'component/ProductSummary';
import DatePicker from 'component/DatePicker';
import TimePicker from 'component/TimePicker';

import getServerData from 'util/getServerData';

const CartPage = () => {

  // change language
  const { language } = useContext(LanguageContext);
  const content = language.content.pages.cart;
  const lang = language.lang;

  // load order & products
  const { order, mutateOrder } = getServerData('/api/order');
  const { products } = getServerData('/api/products');
  const isLoading =  products ? false : true;

  // delivery day & response status state
  const [ deliveryDay, setDeliveryDay ] = useState(null);
  const [ status, setStatus ] = useState(null);
  const router = useRouter();

  const handleOrder = () => {
    fetch('/api/user/orders', {
      method: 'POST',
      body: JSON.stringify({ lang }),
    }).then( res => {
      setStatus(res.status);
      // if order ok, delete session order and route
      if ( res.status === 200 ){
        fetch('/api/order', { method: 'DELETE' }).then(() => mutateOrder())
        router.replace('/');
      };
    })
  };

  let body = (
    <Container fluid style={{maxWidth: 650}}>
      <h1>{ content.h1.order }</h1>
      <br/>
      <h4>{ content.h4.details }</h4>
      <ProductSummary {...{ order, products, language }}/>
      <Container fluid className="d-flex px-0 py-2">
        <div className="h4 pr-3">{ content.h4.order }</div>
        <div>
          <DatePicker {...{ language, deliveryDay, setDeliveryDay }}/>
        </div>
      </Container>
      <Container fluid className="d-flex px-0 py-2">
        <div className="h4 pr-3 my-auto">{ content.h4.time }</div>
        <div>
          <TimePicker {...{ language, deliveryDay }}/>
        </div>
      </Container>
      <Button
        className="my-3"
        variant="primary"
        disabled={!(order?.products && order?.delivery)}
        onClick={handleOrder}>
        { content.button }
      </Button>
      <p className={ status === 200 ? "text-success" : "text-danger" }>
        { status && content.status[status]}
      </p>
    </Container>
  );

  // change body if order not defined
  if ( !order || order?.products && Object.keys(order.products).length === 0 ) {
    body =
      <Container fluid style={{maxWidth: 650}}>
        <h1>{ content.h1.basket }</h1>
      </Container>;
  };

  return (
    <MainLayout isLoading={isLoading}>
      {body}
    </MainLayout>
  );
}

export default CartPage;
