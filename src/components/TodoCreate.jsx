import { useEffect, useRef, useState } from 'react';

export default function TodoCreate({ onCreate }) {
  const [taskText, setTaskText] = useState('');
  const addInputRef = useRef(null);

  const handleSubmit = () => {
    if (taskText.length < 1) {
      addInputRef.current.focus();
      return;
    }
    onCreate(taskText);
    setTaskText('');
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && taskText) {
      onCreate(taskText);
      setTaskText('');
    }
  };

  useEffect(() => {
    if (taskText && addInputRef.current) {
      addInputRef.current.focus();
    }
  }, [taskText]);

  return (
    <>
      <h2 className="ir">투두리스트 입력창</h2>
      <div className="h-[50px]  mb-2.5 flex justify-between bg-[#eaeaea] rounded-3xl text-base">
        <input
          type="text"
          placeholder="할일을 입력해주세요."
          value={taskText}
          ref={addInputRef}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="flex-1 p-5  font-LINESeedKR-Rg bg-transparent placeholder:text-gray-500"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-[90px] text-white bg-[#9070c0] rounded-3xl hover:bg-[#584278]"
        >
          등록하기
        </button>
      </div>
    </>
  );
}
