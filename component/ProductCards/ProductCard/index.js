import React, { useContext } from 'react';

import { OrderContext } from 'context/Order';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import amountPretty from 'util/amountPretty';

const ProductCard = ({product, addProduct, subProduct}) => {

  const { order } = useContext(OrderContext);

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
            {amountPretty(product, order.products[product._id])}
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
