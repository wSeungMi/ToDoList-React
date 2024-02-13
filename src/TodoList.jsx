import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faPenToSquare,
  faCheck,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const TodoList = () => {
  const [todo, setTodo] = useState([
    { id: 1, content: '자바스크립트 공부하기', done: false },
    { id: 2, content: '리액트 투두 만들기', done: true },
  ]);
  const [taskText, setTaskText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

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

  return (
    <div className="w-full min-h-screen bg-gradient-purple flex flex-col justify-center items-center">
      <section className="min-w-[600px] h-[540px] my-0 mx-auto py-7 px-8 bg-white border rounded-3xl">
        <h1 className="mb-2.5 text-[24px] font-LINESeedKR-Bd">To Do List</h1>
        <h2 className="ir">투두리스트 입력창</h2>
        <div className="h-[50px]  mb-2.5 flex justify-between bg-[#eaeaea] rounded-3xl text-base">
          <input
            type="text"
            placeholder="할일을 입력해주세요."
            value={taskText}
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
        <ul id="todo_list" className="pt-1 px-3.5 pb-1.5">
          {todo.map((list) => (
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
                        {list.content}{' '}
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
      </section>
    </div>
  );
};

export default TodoList;
