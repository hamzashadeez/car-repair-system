import moment from "moment";
import React, { useState, useEffect } from "react";
import "./order.css";
import firebase from "firebase";
import { db } from "../../firebase";
import Form from "react-bootstrap/Form";

function OrderDetails(props) {
  const [mechanics, setMechanics] = useState([]);
  const [mechanic, setMechanic] = useState("");
  const { data, id } = (props.location && props.location.state) || {};
  const { name, cost, quantity, type, carName, model, date } = data || {};
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const sendInvoice = async () => {
    await db.collection('customers').doc(data.customer).get().then((cust)=>{
      console.log(cust.data())
      let message = `Hello ${cust.data().name}, we recieved your vehicle ${carName} ${model} for our service, your estimated amount is ${cost}.0, thank you.`;
      let link = `https://wa.me/${cust.data().phone}/?text=${message}`
      window.open(link, '_blank');
    })
  };

  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection("orders")
        .doc(id)
        .collection("comment")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const submitComment = async (e) => {
    e.preventDefault();
    await db.collection("orders").doc(id).collection("comment").add({
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: "Admin",
    });
    setComment("");
  };

  const assign = async () => {
    if (mechanics !== "Not selected") {
      await db
        .collection("mechanics")
        .doc(mechanic)
        .update({
          assignments: firebase.firestore.FieldValue.arrayUnion({
            data,
            id,
            date: moment().format("DD/MM/YYYY"),
          }),
        })
        .then(() => {
          alert(`Successful`);
        })
        .catch((e) => {
          console.log(e);
          console.log("something went wrong");
        });
    }
  };

  useEffect(() => {
    (async () => {
      db.collection("mechanics").onSnapshot((snapshot) => {
        setMechanics(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);
  return (
    <div className="screen">
      <div className="orderDetail_main">
        <div className="bigDiv">
          {carName ? (
            <button
              className="btn btn-info"
              style={{ position: "absolute", right: "10px" }}
              onClick={() => sendInvoice()}
            >
              Send Invoice
            </button>
          ) : (
            ""
          )}
          {carName ? (
          <h3>
            Service: <span style={{ color: "#8a3b47" }}>{name}</span>
          </h3>
          ) : (
            <h3>
            Product Name: <span style={{ color: "#8a3b47" }}>{name}</span>
          </h3>
          )}

          <h3>
            Selling Price: <span style={{ color: "#8a3b47" }}>{cost}</span>
          </h3>
          {quantity ? (
            <h3>
              Stock Remain: <span style={{ color: "#8a3b47" }}>{quantity}</span>
            </h3>
          ) : (
            ""
          )}
          <h3>
            Order Type:{" "}
            <span style={{ color: "#8a3b47" }}>{type.toUpperCase()}</span>
          </h3>
          {carName ? (
            <h3>
              Car Name: <span style={{ color: "#8a3b47" }}>{carName}</span>
            </h3>
          ) : (
            ""
          )}

          {model ? (
            <h3>
              Car Model: <span style={{ color: "#8a3b47" }}>{model}</span>
            </h3>
          ) : (
            ""
          )}
          {/* {date ? <h3>
            Date: <span style={{ color: "#8a3b47" }}>{date}</span>
          </h3>: ""} */}

          {type === "service" ? (
            <div className="assign_tasks">
              <h4>Assign Work to a mechanic</h4>
              <label>Choose a mechanic</label>
              <select onChange={(e) => setMechanic(e.target.value)}>
                <option>Not selected</option>
                {mechanics.map(({ id, data }) => (
                  <option value={id} key={id}>
                    {data.name}
                  </option>
                ))}
              </select>
              <button className="btn btn-success" onClick={() => assign()}>
                Submit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="smDiv">
          {type === "service" ? (
            <div>
              <div className="message_div">
                <div className="comments">
                  {comments.map((comment) => (
                    <p key={comment.text}>
                      <strong>{comment.username}</strong>{" "}
                      <span>{comment.text}</span>
                    </p>
                  ))}
                </div>
              </div>
              <form onSubmit={(e) => submitComment(e)} className="message_form">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="type your message"
                  className="messageInput"
                />
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
