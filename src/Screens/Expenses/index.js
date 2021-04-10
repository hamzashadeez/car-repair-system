import React, {useState, useEffect} from "react";
import "./style.css";
import ExpModal from './Modal/ExpModal'
import IncModal from './Modal/IncModal'
import {db} from '../../firebase'

const ExpoListItem = ({ data }) => {
  return (
    <div className="ExpoListItem">
      <div className="cont ml-1">
        {data.type !== "expense" ? (
          <i className="fas fa-arrow-up" style={{ color: "seagreen" }}></i>
        ) : (
          <i className="fas fa-arrow-down" style={{ color: "indianred" }}></i>
        )}
      </div>
      <div className="ExpoSideDiv">
        {data.type !== "expense" ? <h4 style={{color: "seagreen"}}>${data.amount}</h4> : <h4 style={{color: "indianred"}}>$21092</h4>}
        <p>{data.label}</p>
        <p>{data.date}</p>
      </div>
    </div>
  );
};

const ExpBox = ({ value, color, arrow, click }) => {
  return (
    <div
      onClick={click}
      className="BoxExp"
      style={{ borderBottom: `7px solid ${color}`, color: color }}
    >
      <h4>${value}</h4>
      <div>
        <i className={arrow}></i>
      </div>
    </div>
  );
};

function Expenses() {
    const [showExpModal, setExpModal] = useState(false);
    const [showIncModal, setIncModal] = useState(false);
    const [record, setRecord] = useState([])
    const [inc, setInc] = useState(0)
    const [exp, setExp] = useState(0)

    const closeExp = ()=>{
        setExpModal(false)
    }
    const closeInc = ()=>{
        setIncModal(false)
    }

    
  useEffect(() => {
    (async () => {
      db.collection("expenses").orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
        setRecord(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      db.collection("exp").onSnapshot((snapshot) => {
        setExp(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      db.collection("income").onSnapshot((snapshot) => {
        setInc(
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
      <div className="expense">
          <ExpModal show={showExpModal} onHide={closeExp} closeExp={closeExp} />
          <IncModal show={showIncModal} onHide={closeInc} closeInc={closeInc} />
        <div className="menu_exp">
          <ExpBox arrow="fas fa-arrow-up" value={inc[0]?.data.income} click={()=>setIncModal(true)} color="seagreen" />
          <ExpBox arrow="fas fa-arrow-down" value={exp[0]?.data.expense} click={()=>setExpModal(true)} color="indianred" />
        </div>
        <div className="list_exp">

        {record.map(({ id, data }) => (
          <ExpoListItem key={id} data={data} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
