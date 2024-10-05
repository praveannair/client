import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Todo() {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
    console.log(count);
  }, [count]);

  const handlesubmit = () => {
    axios
      .post("http://localhost:8081/", { task: todo })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setCount(count + 1);
  };
  
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/" + id)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setCount(count + 1);
  };
  const handleEdit = (id, done) => {
    axios
      .put("http://localhost:8081/" + id, { done: done })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setCount(count + 1);
  };

  return (
    <div style={{ marginLeft: "100px" }}>
      <h1>Todo Application</h1>
      <input
        type="text"
        name="task"
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button onClick={handlesubmit}>Add</button>
      <div style={{ textAlign: "left" }}>
        {todos && todos.map((item) => (
          <div key={item._id}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleEdit(item._id, item.done)}
            ></input>
            {item.task}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
