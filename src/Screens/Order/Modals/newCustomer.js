import React from "react";
import Modal from "react-bootstrap/Modal";


function NewCustomer({...props}) {
  return (
    <Modal
      {...props}
      size="md"
    //   backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-info text-muted"
        >
          New Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
    </Modal>
  );
}

export default NewCustomer;
