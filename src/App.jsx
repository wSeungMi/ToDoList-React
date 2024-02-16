import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
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

  const onCreate = (taskText) => {
    setTodo([...todo, { id: uuid(), content: taskText, done: false }]);
  };

  useEffect(() => {
    localStorage.setItem('my-todo', JSON.stringify(todo));

    if (todo.length === 0) {
      localStorage.removeItem('my-todo');
    }
  }, [todo]);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-purple flex flex-col justify-center items-center">
        <TodoTemplate>
          <TodoCreate onCreate={onCreate} />
          <TodoList todoList={todo} />
        </TodoTemplate>
      </div>
    </>
  );
}

export default App;
