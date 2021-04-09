import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import { db } from "../../firebase";
import { UserContext } from "../../UserContext";

function Profile() {
  const [state] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [active, setActive] = useState('active');

  useEffect(() => {
    if (state.id) {
      (async () => {
        await db
          .collection("mechanics")
          .doc(state.id)
          .onSnapshot((shot) => {
            setUser(shot.data());
          });
      })();
    }
  }, []);

  const ChangeStatus = async(e) =>{
      e.preventDefault();
      await db.collection("mechanics").doc(state.id).update({status: active})
      .then(()=>{
          alert("Status Changed")
      }).catch(()=>{
          alert("Something went wrong")
      })
  }
  return (
    <div className="screenn">
      <div className="profile_main">
        <div className="profile_data">
          <div className="iconContainer">
            <i class="fas fa-user"></i>
          </div>
          <div className="labelsContainer">
            <p>
              Name: <span>{user.name}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Status: <span>{user?.status?.toUpperCase()}</span>
            </p>
            <p>
              Code: <span>{user.code}</span>
            </p>
          </div>
        </div>
        <div className="profile_configs">
          <Form onSubmit={(e)=>ChangeStatus(e)}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Change Status</Form.Label>
              <Form.Control onChange={(e)=>setActive(e.target.value)} as="select">
                <option>Active</option>
                <option>Not Active</option>
              </Form.Control>
            </Form.Group>
            <button className="btn btnChange">Change</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
