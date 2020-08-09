import React, { useContext, useEffect, useState } from 'react';

import { OrderContext } from 'context/Order';
import * as actions from 'context/Order/actions';
import * as types from 'context/Order/types';

import Head from 'next/head';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import MainLayout from 'layout/MainLayout';

import amountPretty from 'util/amountPretty';

var removeDiacritics = require('diacritics').remove;

const OrderPage = ({products}) => {

  const { order, orderDispatch } = useContext(OrderContext);

  const [formText, setFormText] = useState('');

  // save order locally
  // ------------------
  useEffect(() => {
    const localOrderJSON = JSON.stringify(order)
    localStorage.setItem('localOrder', localOrderJSON);
  }, [order]);

  // product change handlers
  // -----------------------
  const addHandler = (id) => {
    orderDispatch({
      type: types.ADD_PRODUCT,
      products: products,
      id: id,
    });
  };

  const subHandler = (id) => {
    orderDispatch({
      type: types.SUB_PRODUCT,
      products: products,
      id: id,
    });
  };

  // card creation
  // -------------
  const re = new RegExp(removeDiacritics(formText), 'i');
  let cards = products
    .filter(product => re.test(removeDiacritics(product.name)))
    .map(product => {

      // pretty amount string
      // --------------------
      const amount = order.products[product.id];
      const amountString = amountPretty(product, amount);

      return (
        <Col key={product.id} className="p-2">
          <Card className="h-100 d-flex">

            <Card.Body className="d-flex flex-column">

              <Container className="flex-grow-1 d-flex">
                <img src={product.image} className="align-self-center mw-100 mh-100"/>
              </Container>

              <Card.Title >
                {`${product.name} (${product.price}kn/${product.priceUnit === 1 ? '' : product.priceUnit+' '}${product.priceText})`}
              </Card.Title>

              <Card.Text> {product.description} </Card.Text>

              <Card.Footer className="d-flex">
                <Button
                  className="flex-shrink-0"
                  style={{width: '20%'}}
                  variant="danger"
                  onClick={() => subHandler(product.id)}> - </Button>
                <Container className="text-center my-auto">
                  {amountString}
                </Container>
                <Button
                  className="flex-shrink-0"
                  style={{width: '20%'}}
                  onClick={() => addHandler(product.id)}
                  variant="success"> + </Button>
              </Card.Footer>

            </Card.Body>
          </Card>
        </Col>
      );

    });

  return (
    <MainLayout>
      <Container fluid style={{maxWidth: '85%'}}>

        <h1> Ponuda </h1>

        <Form className="py-2 px-3 mx-auto" style={{maxWidth: 700}}>
          <Form.Control
            type="text"
            placeholder="Pretražite proizvod"
            value={formText}
            onChange={(event) => setFormText(event.target.value)}/>
        </Form>

        <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
          {cards}
        </Row>

      </Container>
    </MainLayout>
  )
}


export async function getServerSideProps(){
  let products = await require('data/products.json');
  return {
    props: {
      products: products
    }
  }
}
export default OrderPage;
