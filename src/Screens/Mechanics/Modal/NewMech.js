import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {db} from '../../../firebase'
import { v4 as uuidv4 } from "uuid";

function NewMech({hide, ...props }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")

    const submit = async (e)=>{
      const id = uuidv4();
      const data = {
        name: name,
        email: email,
        code: code,
        status: 'active',
        assignments: [],
        id: id,
      }
      e.preventDefault()
      await db
      .collection("mechanics")
      .doc(id)
      .set(data)
      .then(() => {
        alert("A new mechanic is added");
        hide()
    
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
          New Mechanic
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
          <Form.Group controlId="formBasic">
            <Form.Control value={code} onChange={(e)=>setCode(e.target.value)} required type="number" placeholder="Login Code e.g 1234" />
          </Form.Group>
          <button className='btn btn-info'>Submit</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewMech;
