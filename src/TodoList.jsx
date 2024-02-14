import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faPenToSquare,
  faCheck,
  faTrash,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function initStoreTodos() {
  const getTodos = JSON.parse(localStorage.getItem('my-todo'));
  return getTodos ? getTodos : [];
}

const TodoList = () => {
  const [todo, setTodo] = useState(initStoreTodos);
  const [taskText, setTaskText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const inputFocusRef = useRef({
    add: null,
    edit: null,
  });

  const handleAddTodo = () => {
    if (!taskText) {
      alert('할일을 입력해주세요🙌!');
      return;
    }
    setTodo([...todo, { id: uuid(), content: taskText, done: false }]);
    setTaskText('');
  };

  const handleKeyDown = (e, action, editId) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && action === 'add') {
      handleAddTodo();
    } else if (e.key === 'Enter' && action === 'edit') {
      handleUpdatedTodo(editId);
    }
  };

  const onEdit = (id, prevContent) => {
    setEditingId(id);
    setUpdatedContent(prevContent);
  };

  useEffect(() => {
    if (inputFocusRef.current.add) {
      inputFocusRef.current.add.focus();
    }
    if (inputFocusRef.current.edit) {
      // 추가 input 요소에 포커스 설정
      inputFocusRef.current.edit.focus();
    }
  }, [editingId, taskText]);

  const handleModifyTodo = (content) => {
    setUpdatedContent(content);
  };

  const handleUpdatedTodo = (updatedId) => {
    if (!updatedContent) {
      alert('할일을 입력해주세요🙌!');
      return;
    }

    const updatedTodo = todo.map((item) => {
      if (item.id === updatedId) {
        return { ...item, content: updatedContent };
      }
      return item;
    });

    setTodo(updatedTodo);
    setEditingId('');
  };

  const handleEdtingReset = () => {
    const isConfirm = window.confirm('수정을 취소하시겠습니까?');
    if (!isConfirm) return;

    setUpdatedContent('');
    setEditingId('');
  };

  const handleDeleteTodo = (delId) => {
    const isConfirm = window.confirm('정말 삭제하시겠습니까?');
    if (!isConfirm) return;

    const filteredData = todo.filter((item) => item.id != delId);
    setTodo(filteredData);

    // 현재 페이지의 마지막 항목이 삭제되었을 때 offset 업데이트
    if (filteredData.length === offset && offset > 0) {
      setPage(page - 1); // 현재 페이지가 1페이지가 아니라면 이전 페이지로 이동
    }
  };

  const handlecompletedTodo = (doneId) => {
    const isCompleted = todo.map((item) => {
      if (item.id === doneId) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTodo(isCompleted);
  };

  useEffect(() => {
    localStorage.setItem('my-todo', JSON.stringify(todo));

    if (todo.length === 0) {
      localStorage.removeItem('my-todo');
    }
  }, [todo]);

  return (
    <div className="w-full min-h-screen bg-gradient-purple flex flex-col justify-center items-center">
      <section className="min-w-[600px] h-[580px] my-0 mx-auto py-7 px-8 bg-white border rounded-3xl">
        <h1 className="mb-2.5 text-[24px] font-LINESeedKR-Bd">To Do List</h1>
        <h2 className="ir">투두리스트 입력창</h2>
        <div className="h-[50px]  mb-2.5 flex justify-between bg-[#eaeaea] rounded-3xl text-base">
          <input
            type="text"
            placeholder="할일을 입력해주세요."
            value={taskText}
            ref={(el) => (inputFocusRef.current.add = el)}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'add', '')}
            className="flex-1 p-5  font-LINESeedKR-Rg bg-transparent placeholder:text-gray-500"
          />
          <button
            type="submit"
            onClick={handleAddTodo}
            className="w-[90px] text-white bg-[#9070c0] rounded-3xl hover:bg-[#584278]"
          >
            등록하기
          </button>
        </div>
        <ul id="todo_list" className="pt-1 px-3.5 pb-1.5 h-[380px]">
          {todo.slice(offset, offset + limit).map((list) => (
            <li
              key={list.id}
              className="px-1.5 py-2 text-base cursor-pointer select-none flex items-center "
            >
              <div className="flex justify-between w-full">
                {editingId === list.id ? (
                  <>
                    <input
                      type="text"
                      value={updatedContent}
                      ref={(el) => (inputFocusRef.current.edit = el)}
                      onChange={(e) => handleModifyTodo(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'edit', list.id)}
                      className="pb-0.5 border-b-[1.4px] border-[#9070c0] w-full "
                    />

                    <div className="flex">
                      <button className="cursor-pointer pl-4">
                        <FontAwesomeIcon
                          icon={faCheck}
                          size="xl"
                          className="hover:text-zinc-500"
                          onClick={() => handleUpdatedTodo(list.id)}
                        />
                      </button>
                      <button
                        className="cursor-pointer pl-2.5"
                        onClick={() => handleEdtingReset(list.id)}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          size="xl"
                          className="hover:text-zinc-500"
                        />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row">
                      <div
                        className={`w-5 h-5 rounded-[50%] cursor-pointer bg-cover ${list.done ? 'bg-checkbox_on' : 'bg-checkbox_off'}`}
                        onClick={() => handlecompletedTodo(list.id)}
                      ></div>
                      <span
                        className={`ml-3 ${list.done ? 'line-through text-zinc-400' : ''}`}
                      >
                        {list.content}
                      </span>
                    </div>

                    <div className="flex">
                      <button className="cursor-pointer pl-4">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          size="lg"
                          className="hover:text-zinc-500"
                          onClick={() => onEdit(list.id, list.content)}
                        />
                      </button>
                      <button
                        className="cursor-pointer pl-3"
                        onClick={() => handleDeleteTodo(list.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="lg"
                          className="hover:text-zinc-500"
                        />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div>
          <Pagination
            total={todo.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </section>
    </div>
  );
};

export default TodoList;

function Pagination({ total, limit, page, setPage }) {
  const pageNums = Math.ceil(total / limit);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex m-auto">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 
            text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:text-gray-300"
          >
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="lg"
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
          {Array(Math.max(pageNums, 1))
            .fill()
            .map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                ${
                  page === i + 1
                    ? ' text-white bg-[#9070c0] hover:bg-[#584278]'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                } `}
              >
                {i + 1}
              </button>
            ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pageNums}
            className="relative inline-flex items-center rounded-r-md px-2 py-2
             text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:text-gray-300
             "
          >
            <span className="sr-only">Next</span>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="lg"
              className="h-5 w-5 "
              aria-hidden="true"
            />
          </button>
        </nav>
      </div>
    </div>
  );
}
