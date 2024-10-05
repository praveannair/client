import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Users() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [data, setData] = useState(null);
  const [task, setTask] = useState();

  const showData = async () => {
    await axios
      .get("https://merntodo-10m0.onrender.com/todo/", {
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    await axios
      .post("https://merntodo-10m0.onrender.com/users/signup", {
        email: email,
        username: username,
        password: password,
        role: role,
      })
      .then((result) => setToken(result.data.token))
      .catch((err) => console.log(err));
  };

  const addTask = async () => {
    await axios
      .post(
        "https://merntodo-10m0.onrender.com/todo/",
        { task: task },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err));
    await showData();
  };

  const handleLogin = async () => {
    await axios
      .post("https://merntodo-10m0.onrender.com/users/signin", {
        email: email,
        password: password,
      })
      .then((result) => setToken(result.data.token))
      .catch((err) => console.log(err));
    await showData();
  };

  const deleteTask = async (taskId) => {
    const url = "https://merntodo-10m0.onrender.com/todo/";
    await axios
      .delete(url + taskId, {
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err));
    await showData();
  };

  return (
    <div>
      <h1>Todo Application</h1>
      <hr></hr>
      <h2>Sign Up</h2>
      <p>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        ></input>
      </p>
      <p>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        ></input>
      </p>
      <p>
        <input
          type="text"
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter Role"
        ></input>
      </p>
      <p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        ></input>
      </p>
      <p>
        <button onClick={handleSubmit}>Submit</button>
      </p>
      <hr></hr>
      <h2>Sign In</h2>
      <p>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        ></input>
      </p>
      <p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        ></input>
      </p>
      <p>
        <button onClick={handleLogin}>Submit</button>
      </p>
      <hr></hr>
      <h2>My Todo List</h2>
      <p>
        <input
          type="text"
          placeholder="Enter Task"
          onChange={(e) => setTask(e.target.value)}
        ></input>

        <button onClick={addTask}>Add</button>
      </p>
      <ol>
        {data &&
          data.map((obj) => (
            <li key={obj._id}>
              {obj.task}
              <button onClick={() => deleteTask(obj._id)}>Delete</button>
            </li>
          ))}
      </ol>
    </div>
  );
}
