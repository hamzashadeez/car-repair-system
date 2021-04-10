import "./style.css";
import { db } from "../../firebase";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";

const Box = ({ num, label }) => {
  return (
    <div className="box">
      <h4>{num}</h4>
      <p>{label}</p>
    </div>
  );
};

function UserDash() {
  const [state] = useContext(UserContext);
  const [me, setMe] = useState({});
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    (async () => {
      db.collection("orders").onSnapshot((snapshot) => {
        setOrder(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);

  useEffect(() => {
    if (state.id) {
      (async () => {
        await db
          .collection("mechanics")
          .doc(state.id)
          .onSnapshot((shot) => {
            setMe(shot.data());
          });
      })();
    }
  }, []);
  return (
    <div className="screenn">
      <div className="dash">
        <p className="welcome">Welcome back</p>
        <p className="nameMech">{me.name}</p>
        <div className="box_container">
          <Box num={me?.assignments?.length} label="Assignments" />
          <Box num={orders.length} label="Orders" />
          <Box num={me?.status?.toUpperCase()} label="Current Status" />
        </div>
      </div>
    </div>
  );
}

export default UserDash;
