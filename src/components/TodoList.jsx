import TodoItem from './TodoItem';

export default function TodoList({ todoList, onEdit, onRemove }) {
  return (
    <>
      <ul id="todo_list" className="pt-1 px-3.5 pb-1.5 h-[380px]">
        {todoList.map((list) => (
          <TodoItem
            key={list.id}
            {...list}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </>
  );
}
