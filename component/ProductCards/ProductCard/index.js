import React from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import amountPretty from 'util/amountPretty';
import getServerData from 'util/getServerData';

const ProductCard = ({ product }) => {
  // language change
  const { language } = useContext(LanguageContext);
  const lang = language.lang;
  // load order
  const _id = product._id;
  const { order, mutateOrder } = getServerData('/api/order');
  const amount = order?.products?.find(product => product._id === _id)?.amount || 0;
  // sub product
  const subProduct = () => {
    const newAmount = 
      // if bigger than 0
      ( amount > 0 ) ?
      // and there is a min amount
      ( ( amount === product.min ) && ( product.min > 0) ? 
        // sub the min amount
        amount - product.min :
        // otherwise decrement
        amount - product.by ) :
      // otherwise return the same
      amount;
    changeProducts(newAmount);
  };
  // add product
  const addProduct = () => {
    const newAmount =
      // if less than max allowed or what is left
      ( amount < product.max ) && ( amount < product.total ) ?
      // and there is a min amount
      ( ( amount === 0 ) && ( product.min > 0) ?
        // add the min amount
        amount + product.min :
        // otherwise increment
        amount + product.by ) :
      // otherwise return the same
      amount;
    changeProducts(newAmount);
  };
  const changeProducts = async (amount) => {
    // copy the order without the changing product
    const newOrder = {
      ...order,
      products: order?.products.filter(product => product._id !== _id) || [],
    }
    // push it if the amount is > 0
    if (amount>0) {
      newOrder.products.push({ _id, amount });
    };
    // update order
    mutateOrder({ order: newOrder }, false);
    await fetch('/api/order', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newOrder),
    });
    mutateOrder();
  };
  // render
  const {
    image,
    name,
    price,
    priceUnit,
    priceText,
  } = product;
  return (
    <Card bg="light" className="h-100">
      <Card.Body className="d-flex flex-column text-center">
        <Container className="flex-grow-1 d-flex">
          <img
            srcSet={[
              require(`public/${image}?webp`),
              require(`public/${image}`)
            ].join(', ')}
            className="align-self-center mw-100 mh-100"/>
        </Container>
        <Container className="w-100 px-0 pt-2 m-0">
          <Card.Title> { name[lang] || name } </Card.Title>
          <Card.Body>
            {`${price}kn/${priceUnit === 1 ? '' : priceUnit+' '}${priceText[lang] || priceText}`}
          </Card.Body>
          <Card.Footer className="d-flex">
            <Button
              className="flex-shrink-0"
              style={{width: '20%'}}
              variant="danger"
              onClick={subProduct}> - </Button>
            <Container className="text-center my-auto">
              {amountPretty({ product, amount, lang })}
            </Container>
            <Button
              className="flex-shrink-0"
              style={{width: '20%'}}
              onClick={addProduct}
              variant="success"> + </Button>
          </Card.Footer>
        </Container>
      </Card.Body>
    </Card>
  );

};

export default ProductCard;
