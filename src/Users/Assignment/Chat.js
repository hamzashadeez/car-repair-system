import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { UserContext } from "../../UserContext";
import { db } from "../../firebase";
import firebase from 'firebase'

function Chat(props) {
  const { data, id } = (props.location && props.location.state) || {};
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [state] = useContext(UserContext);

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

  const sendMessage = async(e)=>{
    e.preventDefault();
    await db.collection("orders").doc(id).collection("comment").add({
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: state.name,
    });
    setComment("");
  }

  return (
    <div className="screenn">
      <div className="Chat_main">
        <div className="Chat_container shadow">
          <div>
            {comments.map((comment) => (
              <p key={comment.text}>
                <strong>{comment.username}</strong> <span>{comment.text}</span>
              </p>
            ))}
          </div>
          <form onSubmit={(e)=>sendMessage(e)} className="chat_form_div">
            <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="type your message" required />
          </form>
        </div>
        <div className="Chat_side">
          <h4>Chatting over {data.name}</h4>
        </div>
      </div>
    </div>
  );
}

export default Chat;
