import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { db } from "../../firebase";
import { UserContext } from "../../UserContext";
import {useHistory} from 'react-router-dom'

const Task = ({ data, id }) => {
    let history = useHistory();
    const chat = ()=>{
        history.push({
            pathname:'/chat',
            state: { data, id },
        })
    }
  return (
    <div className="task">
      <p>
        Name: <span>{data.name}</span>
      </p>
      <p>
        Car Name: <span>{data.carName}</span>
      </p>
      <p>
        Car Model: <span>{data.model}</span>
      </p>
      <p>
        Date Submitted: <span> </span>
      </p>

      <button className="btn btnChange mt-2" onClick={()=>chat()}>Contact Admin</button>
    </div>
  );
};

function Assignment() {
  const [state] = useContext(UserContext);
  const [assigns, setAssigns] = useState([]);

  useEffect(() => {
    console.log(state.id);
    if (state.id) {
      (async () => {
        await db
          .collection("mechanics")
          .doc(state.id)
          .onSnapshot((shot) => {
            setAssigns(shot.data().assignments);
          });
      })();
    }
  }, []);
  return (
    <div className="screenn">
      <div className="assignment_Main">
        {assigns.map(({ id, data }) => (
          <Task key={id} id={id} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Assignment;
