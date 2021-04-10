import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {db} from '../../../firebase'
import { v4 as uuidv4 } from "uuid";
import firebase from 'firebase'
import moment from "moment";

function ExpModal({closeExp, ...props }) {
    const [label, setLabel] = useState("")
    const [amount, SetAmount] = useState(0)

    const submit = async (e)=>{
      const id = uuidv4();
      const data = {
        label,
        amount: parseInt(amount),
        id: id,
        type: "expense",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        date: moment().format("DD/MM/YYYY"),
      }
      e.preventDefault()
      await db
      .collection("expenses")
      .doc(id)
      .set(data)
      .then(() => {
        alert("Successful");
        closeExp()
        SetAmount("");
        setLabel("")
    
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
       <h3 style={{color: 'indianred'}}>New Expense</h3>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e)=>submit(e)}>
          <Form.Group controlId="">
            <Form.Control value={amount} type='number' onChange={(e)=>SetAmount(e.target.value)} required placeholder="Enter Amount" />
          </Form.Group>
          
          <Form.Group >
            <Form.Control value={label}  onChange={(e)=>setLabel(e.target.value)} type="text" required placeholder="Expense From..." />
          </Form.Group>
         
         
          <button className='btn btn-danger'>Submit</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ExpModal;
