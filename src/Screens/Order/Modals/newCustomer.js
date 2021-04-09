import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {db} from '../../../firebase'
import { v4 as uuidv4 } from "uuid";

function NewCustomer({handleClose, ...props }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const submit = async (e)=>{
      const id = uuidv4();
      const data = {
        name: name,
        email: email,
        phone: phone,
        orders: [],
        id: id,
      }
      e.preventDefault()
      await db
      .collection("customers")
      .doc(id)
      .set(data)
      .then(() => {
        alert("A new customer is added");
        handleClose()
        setName("");
        setPhone("")
        setEmail("")
    
      })
      .catch(() => {
        console.log("something went wrong");
      });
    }
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
          New Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e)=>submit(e)}>
          <Form.Group >
            <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" required placeholder="Enter Full Name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="Enter Email" />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Control value={phone} onChange={(e)=>setPhone(e.target.value)} required type="phone" placeholder="Enter Phone Number" />
          </Form.Group>
         
         
          <button className='btn btn-info'>Submit</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewCustomer;
