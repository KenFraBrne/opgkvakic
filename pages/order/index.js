import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import MainLayout from 'layout/MainLayout';
import ProductCards from 'component/ProductCards';

import { remove as removeDiacritics } from 'diacritics';

import getServerData from 'util/getServerData';

const OrderPage = () => {

  // products
  const { products } = getServerData('/api/products');

  // form text state
  const [ formText, setFormText ] = useState('');

  // filter products with form input
  const re = new RegExp(removeDiacritics(formText), 'i');
  const filteredProducts = products && products.filter(product => re.test(removeDiacritics(product.name)));

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

        <ProductCards filteredProducts={filteredProducts}/>

      </Container>
    </MainLayout>
  )
}

export default OrderPage;
