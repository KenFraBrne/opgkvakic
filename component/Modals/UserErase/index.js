import React from 'react';

import { useRouter } from 'next/router';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function UserErase({ show, setShow, mutateUser }){
  // language
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Modals.UserErase;
  // handle user delete
  const router = useRouter();
  const handleModalButton = async (isDelete) => {
    if (isDelete){
      await fetch('/api/user/update', { method: 'DELETE' });
      mutateUser();
      router.push('/');
    };
    setShow(false);
  };
  // render
  return (
    <Modal
      centered
      show={show}
      backdrop="static"
      onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{ content.ModalTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ content.ModalBody }</Modal.Body>
      <Modal.Footer>
        <Button
          variant="light"
          onClick={() => handleModalButton(false)}>
          { content.Button[0] }
        </Button>
        <Button
          variant="danger"
          onClick={() => handleModalButton(true)}>
          { content.Button[1] }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserErase;
