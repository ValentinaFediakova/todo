import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../features/todos/types';
import { addTodo } from '../../features/todos/todosSlice';
import './AddTodo.scss';


export const AddTodo = () => {
  const [text, setText] = useState('')
  const [isMultilineString, setIsMultilineString] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const textarearef = useRef<HTMLTextAreaElement | null>(null)

  const handleClick = () => {
    textarearef.current?.focus()
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleAddTodo = () => {
    const trimmedtext = text.trim()
    if (trimmedtext) {
      dispatch(addTodo(trimmedtext))
      setText('')
      setIsMultilineString(false);
    }
  }

  const setHeight = () => {
    if (text === '') {
      setIsMultilineString(false);
      if (textarearef.current) {
        textarearef.current.style.height = 'auto';
      }
      return;
    }
    const textA = textarearef.current;
    if (!textA) return;
    textA.style.height = 'auto';
    textA.style.height = `${textA.scrollHeight}px`;
    setIsMultilineString(textA.scrollHeight > 57);
  };

  useEffect(() => {
    setHeight();
  }, [text]);

  return (
    <div className="add-todo__content">
      <textarea 
        ref={textarearef}
        className={`add-todo__textarea ${isMultilineString ? 'add-todo__textarea_multiline' : ''}`}
        placeholder="Add a new task"
        value={text}
        onClick={handleClick}
        onChange={handleChange}
      />
      <button className="add-todo__button" onClick={handleAddTodo}>Add</button>
    </div>
  );
}