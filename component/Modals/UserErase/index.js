import React from 'react';

import { useRouter } from 'next/router';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function UserErase({ show, setShow, mutateUser }){

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
        <Modal.Title>Izbriši korisnika</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Jeste li sigurni da želite izbrisati vaš korisnički račun?
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

export default UserErase;
