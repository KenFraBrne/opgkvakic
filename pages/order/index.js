import React, { useContext, useEffect, useState } from 'react';

import { OrderContext } from 'context/Order';
import * as actions from 'context/Order/actions';
import * as types from 'context/Order/types';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import MainLayout from 'layout/MainLayout';
import ProductCards from 'component/ProductCards';

var removeDiacritics = require('diacritics').remove;

const OrderPage = ({products}) => {

  // order context
  const { orderDispatch } = useContext(OrderContext);

  // form text state
  const [formText, setFormText] = useState('');

  // product change handlers
  // -----------------------
  const addProduct = (id) => {
    orderDispatch({
      type: types.ADD_PRODUCT,
      products: products,
      productId: id,
    });
  };

  const subProduct = (id) => {
    orderDispatch({
      type: types.SUB_PRODUCT,
      products: products,
      productId: id,
    });
  };

  // filter products with form input
  // -------------------------------
  const re = new RegExp(removeDiacritics(formText), 'i');
  const filteredProducts = products.filter(product => re.test(removeDiacritics(product.name)));

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

        <ProductCards
          products={filteredProducts}
          addProduct={(id) => addProduct(id)}
          subProduct={(id) => subProduct(id)}/>

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
