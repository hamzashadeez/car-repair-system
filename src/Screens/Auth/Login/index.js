import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import { users } from "../../../users";
import { UserContext } from "../../../UserContext";

const Login = () => {
  const [user, setUser] = useState("");
  const [code, setCode] = useState("");
  const [logged, setLogged] = useState({});
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    setUser(users[0].name.toLowerCase());
    let searchUser = "";
    users.map((d) => {
      if (user === d.name.toLowerCase()) {
        searchUser = d;
        setLogged(d);
      }
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    let searchUser = "";
    users.map((d) => {
      if (user === d.name.toLowerCase()) {
        searchUser = d;
        setLogged(d);
      }
    });

    if (code === searchUser.code) {
      console.log("you are logged");
      setState({name: user, code})
      console.log(state)
    //   localStorage.setItem("userAuth", logged);
    } else {
      alert("Incorrect Login Credentials");
    }
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
          {users.map((d, index) => (
            <option key={index} value={d.name.toLowerCase()}>
              {d.name}
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
