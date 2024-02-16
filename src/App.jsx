import React, { useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';
import './App.css';

function initStoreTodos() {
  const getTodos = JSON.parse(localStorage.getItem('my-todo'));
  return getTodos ? getTodos : [];
}
function App() {
  const [todo, setTodo] = useState(initStoreTodos);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-purple flex flex-col justify-center items-center">
        <TodoTemplate>
          <TodoCreate />
          <TodoList todoList={todo} />
        </TodoTemplate>
      </div>
    </>
  );
}

export default App;
