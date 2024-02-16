import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faPenToSquare,
  faCheck,
  faTrash,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function TodoList({ todoList }) {
  return (
    <>
      <ul id="todo_list" className="pt-1 px-3.5 pb-1.5 h-[380px]">
        {todoList.map((list) => (
          <li
            key={list.id}
            className="px-1.5 py-2 text-base cursor-pointer select-none flex items-center "
          >
            <div className="flex justify-between w-full">
              <>
                <div className="flex flex-row">
                  <div
                    className={`w-5 h-5 rounded-[50%] cursor-pointer bg-cover ${list.done ? 'bg-checkbox_on' : 'bg-checkbox_off'}`}
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
                    />
                  </button>
                  <button className="cursor-pointer pl-3">
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      className="hover:text-zinc-500"
                    />
                  </button>
                </div>
              </>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
