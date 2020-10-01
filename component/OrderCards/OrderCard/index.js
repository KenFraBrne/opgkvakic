import React from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FiChevronsUp, FiChevronsDown, FiX } from 'react-icons/fi';

import ProductSummary from 'component/ProductSummary';

import fromUntilString from 'util/fromUntilString';

export default function OrderCard({ ind, order, isDown, products, handleUpDown, handleTrashClick }){
  // language
  const { language } = useContext(LanguageContext);
  const content = language.content.component.OrderCards.OrderCard;
  // calculate total price
  const total = order.products.reduce( (total, product) => {
    const amount = product.amount;
    const { price, priceUnit } = product.details;
    return total+amount*price/priceUnit;
  }, 0);
  // disable buttons based on date
  const lateDate = new Date();
  lateDate.setDate(lateDate.getDate() - 2);
  const deliveryDate = new Date(order.delivery.from);
  const buttonDisabled = deliveryDate.getTime() < lateDate.getTime();
  // card head
  const cardHead = (
    <Container fluid className="d-flex flex-row px-0 px-md-1 text-left text-nowrap">
      <Accordion.Toggle
        as={Container}
        eventKey={ind.toString()}
        className="d-flex flex-row px-0"
        onClick={() => handleUpDown(ind)}>
        <Container className="ml-sm-5">
          <div><b>{ content.div[0] } { ind+1 }</b></div>
          <div>{ content.div[1] } { total } kn</div>
          <div>{ content.div[2] } { deliveryDate.toLocaleDateString(language.lang) }</div>
          <div>{ content.div[3] } { fromUntilString({ delivery:order.delivery, lang: language.lang }) }</div>
        </Container>
        <Button
          variant="light"
          className="px-3 px-sm-5"
          onClick={() => handleUpDown(ind)}>
          { isDown[ind] ?
            <FiChevronsDown size="2em"/> :
            <FiChevronsUp size="2em"/> }
        </Button>
      </Accordion.Toggle>
      <Button
        variant="light"
        disabled={buttonDisabled}
        className="px-3 px-sm-5"
        onClick={() => handleTrashClick(order._id)}>
        <FiX size="2em"/>
      </Button>
    </Container>
  );
  // card body
  const props = { order, products, language };
  const cardBody = <ProductSummary {...props}/>;
  // render
  return (
    <Card className="mb-2 border-bottom">
      <Card.Header className="px-0">
        {cardHead}
      </Card.Header>
      <Accordion.Collapse eventKey={ind.toString()}>
        <Card.Body className="px-0 px-sm-5">
          {cardBody}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
