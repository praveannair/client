import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Users1() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState(null);
  const [task, setTask] = useState();
  const [answer, setAnswer] = useState();
  const [score, setScore] = useState();
  const [position, setPosition] = useState();
  // const api = "http://localhost:8080";
  const api = "https://merntodo-10m0.onrender.com";

  const showQuestion = async () => {
    await axios
      .get(`${api}/todo/question/`, {
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((result) => setQuestion(result.data))
      .catch((err) => console.log(err));
    await getScore();
  };

  // useEffect(() => {
  //   token!=="" && showQuestion();
  // },[]);

  const submitAnswer = async (actualAnswer) => {
    console.log(answer, actualAnswer, score);
    if (answer === actualAnswer) {
      await axios
        .post(
          `${api}/score/`,
          {},
          {
            headers: {
              authorization: "Bearer " + token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((result) => setScore(result.data.score))
        .catch((err) => console.log(err));
    }
    await showQuestion();
    // await getScore()
  };

  const showData = async () => {
    await axios
      .get(`${api}/todo/`, {
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  };

  const getScore = async () => {
    await axios
      .get(`${api}/score/`, {
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((result) => setScore(result.data.score))
      .catch((err) => console.log(err));
    await axios
      .get(`${api}/score/position`, {
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((result) => setPosition(result.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    await axios
      .post(`${api}/users/signup/`, {
        email: email,
        username: username,
        password: password,
        role: role,
      })
      .then((result) => setToken(result.data.token))
      .catch((err) => console.log(err));
    // await showQuestion()
  };

  const addTask = async () => {
    await axios
      .post(
        `${api}/todo/`,
        { task: task, answer: answer },
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err));
    await showData();
  };

  const handleLogin = async () => {
    await axios
      .post(`${api}/users/signin/`, {
        email: email,
        password: password,
      })
      .then((result) => setToken(result.data.token))
      .catch((err) => console.log(err));
    // await showData();
    // await showQuestion()
    // await getScore()
    // getScore()
  };

  const deleteTask = async (taskId) => {
    const url = `${api}/todo/`;
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
    <>
      <h1>Quiz Application</h1>
      <div style={{ display: "flex" }}>
        <div style={{ padding: "10px", backgroundColor: "silver" }}>
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
        </div>
        <div style={{ padding: "10px" }}>
          {email === "trina@gmail.com" ? (
            <>
              <h2>Question</h2>
              <p>
                <textarea
                  rows="10"
                  cols="100"
                  onChange={(e) => setTask(e.target.value)}
                ></textarea>
              </p>
              <p>
                <select onChange={(e) => setAnswer(e.target.value)}>
                  <option value="0">--Select--</option>
                  <option value="a">a</option>
                  <option value="b">b</option>
                  <option value="c">c</option>
                  <option value="d">d</option>
                </select>
                {/* <input
              type="text"
              placeholder="Enter Task"
              onChange={(e) => setTask(e.target.value)}
            ></input> */}

                <button onClick={addTask}>Submit</button>
              </p>
              <ol>
                {data &&
                  data.map((obj) => (
                    <li key={obj._id}>
                      <pre>{obj.task}</pre>
                      <h5>Answer:{obj.answer}</h5>
                      <button onClick={() => deleteTask(obj._id)}>
                        Delete
                      </button>
                    </li>
                  ))}
              </ol>
            </>
          ) : (
            <>
            <div style={{display:'flex'}}>
              <div style={{width:'1000px'}}>
              <h1>Frontend Developer Quiz (Score:{score})</h1>
              <button onClick={showQuestion}>Start/Skip</button>
              {question &&
                question.map((obj) => (
                  <div style={{ fontSize: "20px" }} key={obj._id}>
                    <pre>{obj.task}</pre>
                    <h5>
                      Answer:
                      <select onChange={(e) => setAnswer(e.target.value)}>
                        <option value="0">--Select--</option>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="d">d</option>
                      </select>
                    </h5>
                    <button onClick={() => submitAnswer(obj.answer)}>
                      Submit
                    </button>
                  </div>
                ))}
                </div>
                <div>
                  <h3>Ranking List</h3>
              <ol>
                {position &&
                  position.map((obj) => (
                    <li key={obj._id}>
                     
                      {obj.user[0].email === email ? (
                        <i>You are here</i>
                      ) : (
                        <i>--------------</i>
                      )}
                    </li>
                  ))}
              </ol>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
