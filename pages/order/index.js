import React, { useState } from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import MainLayout from 'layout/MainLayout';
import ProductCards from 'component/ProductCards';

import { remove as removeDiacritics } from 'diacritics';

import getServerData from 'util/getServerData';

export default function OrderPage(){
  // language change
  const { language } = useContext(LanguageContext);
  const lang = language.lang;
  // products
  const { products } = getServerData('/api/products');
  const isLoading = products ? false : true;
  // form text state
  const [ formText, setFormText ] = useState('');
  // filter products with form input
  const re = new RegExp(removeDiacritics(formText), 'i');
  const filteredProducts = products && products
    .filter(product => {
      const name = product.name[lang] || product.name;
      return re.test(removeDiacritics(name));
    });
  // render
  return (
    <MainLayout isLoading={isLoading}>
      <Container>
        <h1> { language.content.pages.order.h1 } </h1>
        <Form className="py-2 px-3 mx-auto" style={{maxWidth: 700}}>
          <Form.Control
            type="text"
            value={formText}
            placeholder={language.content.pages.order.FormControl}
            onChange={(event) => setFormText(event.target.value)}/>
        </Form>
        <ProductCards filteredProducts={filteredProducts}/>
      </Container>
    </MainLayout>
  )
};
