import React from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function OrderErase({ orders, mutateOrders, orderId, show, setShow }){
  // language
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Modals.OrderErase;
  // order ind
  const orderInd = 1 + orders?.findIndex(order => order._id === orderId);
  // handle
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
  // buttons
  const buttons = [ 
    { variant: 'light', onClick: () => handleModalButton(false) },
    { variant: 'danger', onClick: () => handleModalButton(true) },
  ].map( (button, ind) => {
    return (
      <Button {...button}>{ content.Button[ind] }</Button>
    )
  });
  // render
  return (
    <Modal
      centered
      show={show}
      backdrop="static"
      onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`${content.ModalTitle} ${orderInd}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { `${content.ModalBody} ${orderInd} ?` }
      </Modal.Body>
      <Modal.Footer>
        { buttons }
      </Modal.Footer>
    </Modal>
  )
}

export default OrderErase;
