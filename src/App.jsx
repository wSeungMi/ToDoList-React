import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import TodoTemplate from './components/TodoTemplate';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';
import Pagination from './components/Pagination';
import './App.css';

function initStoreTodos() {
  const getTodos = JSON.parse(localStorage.getItem('my-todo'));
  return getTodos ? getTodos : [];
}
function App() {
  const [todo, setTodo] = useState(initStoreTodos);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const onCreate = (taskText) => {
    setTodo([...todo, { id: uuid(), content: taskText, done: false }]);
  };

  const onCompleted = (targetId) => {
    const isCompleted = todo.map((item) =>
      item.id === targetId ? { ...item, done: !item.done } : item,
    );

    setTodo(isCompleted);
  };

  const onRemove = (targetId) => {
    const filteredData = todo.filter((item) => item.id != targetId);
    setTodo(filteredData);

    // 현재 페이지의 마지막 항목이 삭제되었을 때 offset 업데이트
    if (filteredData.length === offset && offset > 0) {
      setPage(page - 1); // 현재 페이지가 1페이지가 아니라면 이전 페이지로 이동
    }
  };

  const onEdit = (targetId, newContent) => {
    const updatedTodo = todo.map((item) =>
      item.id === targetId ? { ...item, content: newContent } : item,
    );
    setTodo(updatedTodo);
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
          <TodoList
            todoList={todo}
            onCompleted={onCompleted}
            onEdit={onEdit}
            onRemove={onRemove}
            offset={offset}
            limit={limit}
          />
          <Pagination
            total={todo.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </TodoTemplate>
      </div>
    </>
  );
}

export default App;
