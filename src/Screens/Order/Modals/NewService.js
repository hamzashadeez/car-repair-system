import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { db } from "../../../firebase";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { v4 as uuidv4 } from "uuid";

function NewService({hideService, ...props }) {
  const [service, setService] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await db
      .collection("services")
      .doc(uuidv4())
      .set({ name: service })
      .then(() => {
        alert("A new service is added");
        setService("");
        hideService();
      })
      .catch(() => {
        console.log("something went wrong");
      });
  };
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
          New Service
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e)=>submit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control required value={service} onChange={(e)=>setService(e.target.value)} type="text" placeholder="Enter service name" />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewService;
