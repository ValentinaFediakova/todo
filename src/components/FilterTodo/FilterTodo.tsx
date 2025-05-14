import { filters } from '../../constants/filters';
import type { Filter, RootState } from '../../features/todos/types';
import { Button } from '../UI/Button/Button';
import { setFilter } from '../../features/todos/todosSlice';
import { useDispatch, useSelector } from 'react-redux';

import './FilterTodo.scss';


export const FilterTodo = () => {
  const dispatch = useDispatch()
  const currentFilter = useSelector((state: RootState) => state.todos.filter)
  const handleFilterChange = (filter: Filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="filter-todo__content">
      <div className='filter-todo__wrap'>
        {filters.map((filter) => (
          <Button isActive={currentFilter === filter} onHandleClick={() => handleFilterChange(filter)} text={filter.charAt(0).toUpperCase() + filter.slice(1)}/>
        ))}
      </div>

    </div>
  );
}