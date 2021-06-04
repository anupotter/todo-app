import React from "react";
import "./Todo.css";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <label className="containers">
      <input
        id="cb"
        className="m-3"
        type="checkbox"
        checked={todo.complete}
        onChange={handleTodoClick}
      />
      <p className="strikethrough">{todo.name}</p>
    </label>
  );
}
