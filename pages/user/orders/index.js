import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import { FiChevronsUp, FiChevronsDown } from 'react-icons/fi';

import UserLayout from 'layout/UserLayout'
import ProductSummary from 'component/ProductSummary';

import getServerData from 'util/getServerData';
import fromUntilString from 'util/fromUntilString';

const UserOrdersPage = () => {

  const { orders } = getServerData('/api/user/orders');

  const [isDown, setIsDown] = useState( Array(50).fill(true) );

  const orderCards = orders?.map( (order, ind) => {

    // handle up/down
    const handleUpDown = () => {
      const down = Array(isDown.length).fill(true);
      if (isDown[ind]) down[ind] = false;
      setIsDown(down);
    };

    // get delivery date
    const delivery = order.delivery;
    const date = new Date(order.delivery.from);

    // calculate total price
    const total = order.products.reduce( (total, product) => {
      const amount = product.amount;
      const { price, priceUnit } = product.details;
      return total+amount*price/priceUnit;
    }, 0);

    const cardHead = 
      <Container className="d-flex p-0 w-100">
        <Container className="flex-grow-1 text-nowrap">
          <b>{ `Narudžba ${ind+1}` }</b> <br/>
          {`Cijena: ${total} kn`} <br/>
          {`Datum: ${date.toLocaleDateString()}`} <br/>
          {`Vrijeme: ${fromUntilString(delivery)}`}
        </Container>
        <Container className="text-right text-nowrap my-auto">
          <a href='\\'>
            { isDown[ind] ?
              <FiChevronsDown size="2em"/> :
              <FiChevronsUp size="2em"/> }
          </a>
        </Container>
      </Container>
      ;

    const cardBody = <ProductSummary order={order}/>;

    return (
      <Card
        key={order._id}
        className="mb-2 border-bottom">
        <Accordion.Toggle
          as={Card.Header}
          className="px-0"
          onClick={handleUpDown}
          eventKey={ind.toString()}>
          {cardHead}
        </Accordion.Toggle>
        <Accordion.Collapse
          eventKey={ind.toString()}>
          <Card.Body>
            {cardBody}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );

  });

  return (
    <UserLayout>
      <Accordion className="m-3">
        { orders?.length ? orderCards.reverse() : <h3> Trenutno nemate narudžbi </h3> }
      </Accordion>
    </UserLayout>
  );
};

export default UserOrdersPage;
