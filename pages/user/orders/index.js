import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { FiChevronsUp, FiChevronsDown, FiTrash } from 'react-icons/fi';

import UserLayout from 'layout/UserLayout'
import ProductSummary from 'component/ProductSummary';

import getServerData from 'util/getServerData';
import fromUntilString from 'util/fromUntilString';

const UserOrdersPage = () => {

  const { orders, mutateOrders } = getServerData('/api/user/orders');

  // handle chevrons
  const [isDown, setIsDown] = useState( Array(50).fill(true) );

  const handleUpDown = (ind) => {
    const down = Array(isDown.length).fill(true);
    if (isDown[ind]) down[ind] = false;
    setIsDown(down);
  };

  // handle modal & order delete
  const [ show, setShow ] = useState(false);
  const [ orderId, setOrderId ] = useState(null);

  const handleTrashClick = (_id) => {
    setOrderId(_id);
    setShow(true);
  };

  const handleModalButton = async (isDelete) => {
    if (isDelete){
      const body = { _id: orderId };
      await fetch('/api/user/orders', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      }).then(res => {
        const newOrders = orders.filter(order => order._id !== orderId);
        mutateOrders({ orders: newOrders }, false);
        setShow(false);
      });
    };
    setShow(false);
  };

  // order cards
  const orderCards = orders?.map( (order, ind) => {

    // get delivery date
    const delivery = order.delivery;
    const deliveryDate = new Date(order.delivery.from);

    // calculate total price
    const total = order.products.reduce( (total, product) => {
      const amount = product.amount;
      const { price, priceUnit } = product.details;
      return total+amount*price/priceUnit;
    }, 0);

    // disable buttons based on date
    const lateDate = new Date();
    lateDate.setDate(lateDate.getDate() - 2);
    const buttonDisabled = deliveryDate.getTime() < lateDate.getTime();

    // card head
    const cardHead = 
      <Container className="d-flex p-0 w-100">
        <Container className="flex-grow-1 text-nowrap pr-0">
          <b>{ `Narudžba ${ind+1}` }</b> <br/>
          {`Cijena: ${total} kn`} <br/>
          {`Datum: ${deliveryDate.toLocaleDateString()}`} <br/>
          {`Vrijeme: ${fromUntilString(delivery)}`}
        </Container>
        <Container className="text-right text-nowrap pl-0 my-auto">
          <Button variant="light" className="p-0">
            { isDown[ind] ? <FiChevronsDown size="2em"/> : <FiChevronsUp size="2em"/> }
          </Button>
          <Button
            variant="light"
            className="p-0 ml-4"
            disabled={buttonDisabled}
            onClick={() => handleTrashClick(order._id)}>
            <FiTrash size="2em"/>
          </Button>
        </Container>
      </Container>;

    // card body
    const cardBody = <ProductSummary order={order}/>;

    return (
      <Card
        key={order._id}
        className="mb-2 border-bottom">
        <Accordion.Toggle
          as={Card.Header}
          className="px-0"
          onClick={() => handleUpDown(ind)}
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

  // delete order modal
  const orderInd = 1 + orders?.findIndex(order => order._id === orderId);
  const modal = 
    <Modal
      centered
      show={show}
      backdrop="static"
      onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          {` Izbriši narudžbu ${orderInd}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { `Jeste li sigurni da želite izbrisati narudžbu ${orderInd}?` }
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="light"
          onClick={() => handleModalButton(false)}>
          Ne
        </Button>
        <Button
          variant="danger"
          onClick={() => handleModalButton(true)}>
          Da
        </Button>
      </Modal.Footer>
    </Modal>;

  return (
    <UserLayout>
      <Accordion className="m-3">
        { orders?.length ? orderCards.reverse() : <h3> Trenutno nemate narudžbi </h3> }
      </Accordion>
      {modal}
    </UserLayout>
  );
};

export default UserOrdersPage;
