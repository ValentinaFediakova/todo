import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../features/todos/types';
import { addTodo } from '../../features/todos/todosSlice';
import { useAutoResize } from '../../hooks/useAutoResize';

import './AddTodo.scss';


export const AddTodo = () => {
  const [text, setText] = useState('')
  const [isMultilineString, setIsMultilineString] = useState(false);
  const dispatch = useDispatch<AppDispatch>()

  const { ref: textarearef, adjust, baseHeight } = useAutoResize<HTMLTextAreaElement>();

  const handleClick = () => {
    textarearef.current?.focus()
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    adjust();
    setIsMultilineString(textarearef.current!.scrollHeight > textarearef.current!.clientHeight);
  }

  const handleAddTodo = () => {
    const trimmedtext = text.trim()
    if (trimmedtext) {
      dispatch(addTodo(trimmedtext))
      setText('')
      setIsMultilineString(false);
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTodo()
    }
  }

  useEffect(() => {
    adjust();
  }, [adjust]);

  useLayoutEffect(() => {
    adjust()
    setIsMultilineString(
      textarearef.current!.scrollHeight > baseHeight
    )
  }, [text])

  return (
    <div className="add-todo__content">
      <textarea 
        ref={textarearef}
        className={`add-todo__textarea ${isMultilineString ? 'add-todo__textarea_multiline' : ''}`}
        placeholder="Add a new task"
        value={text}
        onClick={handleClick}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="add-todo__button" onClick={handleAddTodo}>Add</button>
    </div>
  );
}