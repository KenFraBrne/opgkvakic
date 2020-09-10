import React, { useContext } from 'react';

import { OrderContext } from 'context/Order';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import amountPretty from 'util/amountPretty';
import getServerData from 'util/getServerData';

const ProductCard = ({ product }) => {

  // load order
  // const { order, mutate } = getOrder();
  const { order, mutateOrder } = getServerData('/api/order');

  // some variables
  const _id = product._id;
  const amount = order?.products[_id] || 0;

  // changeProducts
  const changeProducts = async (newAmount) => {
    let newOrder = {
      ...order,
      products: {
        ...order?.products,
        [_id]: newAmount,
      }
    };
    if (newAmount === 0) delete newOrder.products[_id];
    mutateOrder({ order: newOrder }, false);
    await fetch('/api/order', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newOrder),
    });
    mutateOrder();
  };

  // subProduct
  const subProduct = () => {
    const newAmount = 
      ( amount > 0 ) ?
      ( ( amount === product.min ) && ( product.min > 0) ? 
        amount - product.min :
        amount - product.by ) :
      amount;
    changeProducts(newAmount);
  };

  // addProduct
  const addProduct = () => {
    const newAmount =
      ( amount < product.max ) && ( amount < product.total ) ?
      ( ( amount === 0 ) && ( product.min > 0) ?
        amount + product.min :
        amount + product.by ) :
      amount;
    changeProducts(newAmount);
  };

  return (
    <Card className="h-100 d-flex">
      <Card.Body className="d-flex flex-column">

        <Container className="flex-grow-1 d-flex">
          <img src={product.image} className="align-self-center mw-100 mh-100"/>
        </Container>

        <Card.Title >
          {`${product.name} (${product.price}kn/${product.priceUnit === 1 ? '' : product.priceUnit+' '}${product.priceText})`}
        </Card.Title>

        <Card.Text>
          {product.description}
        </Card.Text>

        <Card.Footer className="d-flex">
          <Button
            className="flex-shrink-0"
            style={{width: '20%'}}
            variant="danger"
            onClick={subProduct}> - </Button>
          <Container className="text-center my-auto">
            {amountPretty(product, amount)}
          </Container>
          <Button
            className="flex-shrink-0"
            style={{width: '20%'}}
            onClick={addProduct}
            variant="success"> + </Button>
        </Card.Footer>

      </Card.Body>
    </Card>
  );

};

export default ProductCard;
