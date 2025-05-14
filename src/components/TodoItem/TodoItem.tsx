
import { DeleteButton } from '../UI/DeleteButton/DeleteButton';
import { Checkbox } from '../UI/Checkbox/Checkbox';
import { editTodo, removeTodo, toggleTodo } from '../../features/todos/todosSlice';
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { useAutoResize } from '../../hooks/useAutoResize'

import type { Task } from '../../features/todos/types';

import './TodoItem.scss';

interface TodoItemProps {
  task: Task
}

export const TodoItem: React.FC<TodoItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  const { ref: textAreaRef, adjust } = useAutoResize<HTMLTextAreaElement>()
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(removeTodo(task.id))
  };

  const handleToggleCheckbox = () => {
    dispatch(toggleTodo(task.id))
  };

  const finishEditing = () => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== task.text) {
      dispatch(editTodo({ id: task.id, text: trimmed }))
    }
    setIsEditing(false)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finishEditing()
    }
    if (e.key === 'Escape') {
      setDraft(task.text)
      setIsEditing(false)
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDraft(e.target.value)
    adjust()
  }

  useEffect(() => {
    adjust() 
    textAreaRef.current?.focus()
  }, [isEditing])

  return (
    <div className="todo-item">
      <div className='todo-item__checkText-wrap'>
        <div className='todo-item__checkbox-wrap'>
          <Checkbox check={task.completed} onHandleToggle={handleToggleCheckbox}/>
        </div>
        <div className='todo-item__text-wrap'>
          {isEditing ? (
            <textarea
              ref={textAreaRef}
              className="todo-item__textarea" 
              value={draft}
              onChange={(e) => handleChange(e)}
              onBlur={finishEditing}
              onKeyDown={handleKeyDown}
            />
          ) : (<span className="todo-item__text" onClick={() => setIsEditing(true)}>{task.text}</span>)
          }
        </div>
      </div>
      <div className='todo-item__buttons'>
        <DeleteButton onHandleDelete={handleDelete}/>
        <div className='todo-item__drag-and-drop'></div>
      </div>
    </div>
  );
}