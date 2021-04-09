import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import { users } from "../../../users";
import { UserContext } from "../../../UserContext";
import { db } from "../../../firebase";

const Login = () => {
  const [user, setUser] = useState("admin");
  const [code, setCode] = useState("");
  const [logged, setLogged] = useState({});
  const [mechanics, setMechanics] = useState([]);
  const [state, setState] = useContext(UserContext);

  // useEffect(() => {
  //   setUser(users[0].name.toLowerCase());
  //   let searchUser = "";
  //   users.map((d) => {
  //     if (user === d.name.toLowerCase()) {
  //       searchUser = d;
  //       setLogged(d);
  //     }
  //   });
  // }, []);

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

  const submit = (e) => {
    e.preventDefault();
    if (user === "admin") {
      if (parseInt(code) === 1234) {
        console.log("welcome admin");
        setState({ name: user, code });
      }
    } else {
      mechanics.map((mech) => {
        if (user === mech.data.name.toLowerCase()) {
          if (parseInt(code) === parseInt(mech.data.code)) {
            console.log(user, " is logged");
            console.log("logged");
            setState({ name: user, code });
          } else {
             alert("Incorrect Login Credentials"); 
          }
          // if (parseInt(code) === mech.data.code) {
          // } else {
          //   console.log(code);
          //   console.log(mech.data.code);
          // }
        }
      });
    }

    // let searchUser = "";
    // users.map((d) => {
    //   if (user === d.name.toLowerCase()) {
    //     searchUser = d;
    //     setLogged(d);
    //   }
    // });

    // if (code === searchUser.code) {
    //   console.log("you are logged");
    //   setState({ name: user, code });
    //   console.log(state);
    //   //   localStorage.setItem("userAuth", logged);
    // } else {
    
    // }
  };
  return (
    <div className="loginPage">
      <div className="loginForm">
        <h3 className="h3_Login">Login To Start</h3>
        <label>Select a user</label>
        <select
          value={user}
          onChange={(e) => {
            console.log(e.target.value);
            setUser(e.target.value.toLowerCase());
          }}
        >
          <option value="admin">Admin</option>
          {mechanics.map(({ id, data }) => (
            <option value={data.name.toLowerCase()} key={id}>
              {data.name}
            </option>
          ))}
        </select>
        <form onSubmit={(e) => submit(e)} className="login__form_div">
          <label>Login Code here</label>
          <input
            placeholder=""
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="btn_login" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
