import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductCard from 'component/ProductCards/ProductCard';

const ProductCards = ({ filteredProducts }) => {
  // cards
  const cards = filteredProducts
    ?.filter(product => product.total > 0)
    .map(product => (
    <Col key={product._id} className="p-3">
      <ProductCard product={product}/>
    </Col>
  ));
  // render
  return (
    <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
      {cards}
    </Row>
  );

}

export default ProductCards;
