import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faPenToSquare,
  faCheck,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
export default function TodoItem({ onEdit, onRemove, done, content, id }) {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const editInputRef = useRef(null);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleQuitEdit = () => {
    const isConfirm = window.confirm('수정을 취소하시겠습니까?');
    if (!isConfirm) return;

    setIsEdit(false);
    setUpdatedContent(content);
  };

  const handleEdit = () => {
    if (updatedContent.length < 1 && editInputRef.current) {
      editInputRef.current.focus();
      return;
    }

    onEdit(id, updatedContent);
    toggleIsEdit();
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  const handleRemove = () => {
    const isConfirm = window.confirm('정말 삭제하시겠습니까?');
    if (!isConfirm) return;

    onRemove(id);
  };

  useEffect(() => {
    if (isEdit && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <>
      <li
        key={id}
        className="px-1.5 py-2 text-base cursor-pointer select-none flex items-center "
      >
        <div className="flex justify-between w-full">
          {isEdit ? (
            <>
              <input
                type="text"
                value={updatedContent}
                ref={editInputRef}
                onKeyDown={handleKeyDown}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="pb-0.5 border-b-[1.4px] border-[#9070c0] w-full "
              />

              <div className="flex">
                <button className="cursor-pointer pl-4" onClick={handleEdit}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="xl"
                    className="hover:text-zinc-500"
                  />
                </button>
                <button className="cursor-pointer pl-2.5">
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="xl"
                    className="hover:text-zinc-500"
                    onClick={handleQuitEdit}
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row">
                <div
                  className={`w-5 h-5 rounded-[50%] cursor-pointer bg-cover ${done ? 'bg-checkbox_on' : 'bg-checkbox_off'}`}
                ></div>
                <span
                  className={`ml-3 ${done ? 'line-through text-zinc-400' : ''}`}
                >
                  {content}
                </span>
              </div>

              <div className="flex">
                <button className="cursor-pointer pl-4" onClick={toggleIsEdit}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="lg"
                    className="hover:text-zinc-500"
                  />
                </button>
                <button className="cursor-pointer pl-3" onClick={handleRemove}>
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
    </>
  );
}
