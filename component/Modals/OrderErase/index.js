import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function OrderErase({ orders, mutateOrders, orderId, show, setShow }){

  const orderInd = 1 + orders?.findIndex(order => order._id === orderId);

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

  return (
    <Modal
      centered
      show={show}
      backdrop="static"
      onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          {` Poništi narudžbu ${orderInd}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { `Jeste li sigurni da želite poništiti narudžbu ${orderInd}?` }
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
    </Modal>
  )
}

export default OrderErase;
