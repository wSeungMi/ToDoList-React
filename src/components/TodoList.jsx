import TodoItem from './TodoItem';

export default function TodoList({
  todoList,
  onCompleted,
  onEdit,
  onRemove,
  offset,
  limit,
}) {
  return (
    <>
      <ul id="todo_list" className="pt-1 px-3.5 pb-1.5 h-[380px]">
        {todoList.slice(offset, offset + limit).map((list) => (
          <TodoItem
            key={list.id}
            {...list}
            onCompleted={onCompleted}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </>
  );
}
