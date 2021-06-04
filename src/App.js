import React, { useState, useRef, useEffect, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { Badge, Container, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

const App = () => {

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  const TodoList = React.lazy(() => import('./TodoList'))

  const [nameOfUser, setNameOfUser] = useState("");
  const { name, setName } = useState("");

  const handleClick = () => {
    const userName = document.getElementById("user-name-who-uses-application").value
    console.log(userName)
    setNameOfUser(userName);
  }
  console.log(nameOfUser)

  return (
    <React.Fragment>
      <Container>
        <div className="text-center mt-4">
          <h3><strong>Welcome To ToDo Application</strong></h3>
          {!nameOfUser ?
            <div>
              <p>Please Provide Your Name :</p>
              <input type="text" id="user-name-who-uses-application" value={name} />
              <div>
                <button type="button" className="btn btn-info btn-sm mt-2" onClick={handleClick}>Continue</button>
              </div>
            </div>
            : <div className="mt-4 mb-2">
              <span className="badge badge-success" style={{ fontSize: "22px" }}>Hello {nameOfUser}</span>
            </div>}
        </div>
        {nameOfUser ?
          <Suspense fallback={<Spinner style={{ width: '5rem', height: '5rem', position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            color="danger" />}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div>
                <h4><b>Enter Todo Here :</b></h4>
                <input className="mr-2" ref={todoNameRef} type="text" />
                <button onClick={handleAddTodo} className="btn btn-warning btn-sm mt-2"><b>Add ToDo</b></button>
                <div>
                  <button onClick={handleClearTodos} className="btn btn-danger btn-sm mt-2"><b>Clear To Do</b></button>
                </div>
              </div>

              <button className="navbar-toggler mt-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">

                  </li>

                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <div className="left"><b><Badge color="dark">{todos.filter(todo => !todo.complete).length}</Badge><Badge color="info m-2" pill>  Todo's Left</Badge></b></div>
                  <div className="right"><b><Badge color="dark">{todos.filter(todo => todo.complete).length}</Badge><Badge color="success m-2" pill>  Todo's Completed</Badge></b></div>
                </form>
              </div>
            </nav>
            <div>
              <div className="content">
                <h4><b><ins>ToDo Task :</ins></b></h4>
              </div>
              <br></br>
              <div className="cammel">
                <TodoList todos={todos} toggleTodo={toggleTodo} />
              </div>
            </div>
          </Suspense>

          : ""}
        <div className="card-footer text-center mt-4">
          <span>Made With{" "}<FontAwesomeIcon icon={faHeart} color="red" />{" "}by Anurag</span>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default App