import React, { useState, useRef, useEffect, Suspense } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';  
import './App.css';
import { Badge, Spinner } from "reactstrap";


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
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

  function handleAddTodo (e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [ ...prevTodos, { id: uuidv4(), name: name, complete:false}]
    })
    todoNameRef.current.value = null
  }

  const TodoList=React.lazy(() => import('./TodoList'))

  return (
    <Suspense fallback={<Spinner style={{ width: '30rem', height: '30rem', position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}

    color="danger" />}>
      <div className="element">
      <h3><b><ins>Enter Stuffs Here :</ins></b></h3>
      <input className="m-3" ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}  className="btn btn-warning btn-lg m-2"><b>Add To Do</b></button>
      <button onClick={handleClearTodos} className="btn btn-danger btn-lg m-2"><b>Clear To Do</b></button>
      <div className="left"><b><Badge color="dark">{todos.filter(todo => !todo.complete).length}</Badge><Badge color="info m-2" pill>  Todo's Left</Badge></b></div>
      <div className="right"><b><Badge color="dark">{todos.filter(todo => todo.complete).length}</Badge><Badge color="success m-2" pill>  Todo's Completed</Badge></b></div>
      </div>
      <br></br>
      <div className="content">
      <h2><b><ins>To Do List :</ins></b></h2>
      </div>
      <br></br>
      <div className="cammel">
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      </div>
    </Suspense>
  );
}

export default App;
