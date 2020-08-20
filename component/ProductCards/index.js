import React, { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductCard from 'component/ProductCards/ProductCard';

const ProductCards = ({products, addProduct, subProduct}) => {

  const cards = products.map(product => (
    <Col key={product.id} className="p-2">
      <ProductCard
        product={product}
        addProduct={() => addProduct(product.id)}
        subProduct={() => subProduct(product.id)}/>
    </Col>
  ));
  
  return (
    <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
      {cards}
    </Row>
  );

}

export default ProductCards;
