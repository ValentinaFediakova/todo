import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectVisibleTodos } from '../../features/todos/todosSelectors'
import { reorderTodos } from '../../features/todos/todosSlice'
import type { RootState, Task } from '../../features/todos/types'
import { TodoItem } from '../TodoItem/TodoItem'

import './Todolist.scss'

export const Todolist = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const tasks: Task[] = useSelector((state: RootState) => selectVisibleTodos(state))
  const dragIndex = useRef<number | null>(null)

  const dispatch = useDispatch()

  const handleDragStart = (index: number) => () => {
    dragIndex.current = index
  }

  const handleDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault()
    setHoverIndex(null)
    setHoverIndex(index)
  }

  const handleDrop = (toIndex: number) => (e: React.DragEvent) => {
    e.preventDefault()
    setHoverIndex(null)
    const fromIndex = dragIndex.current
    if (fromIndex === null || fromIndex === toIndex) return
    dispatch(reorderTodos({ from: fromIndex, to: toIndex }))
    dragIndex.current = null
  }

  return (
    <div className="todo-list__content">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={handleDragStart(index)}
          onDragOver={handleDragOver(index)}
          onDrop={handleDrop(index)}
          className={`todo-list__item ${hoverIndex === index ? 'todo-list__item_hovered' : ''}`}


        >
          <TodoItem task={task} />
        </div>
      ))}
    </div>
  )
}