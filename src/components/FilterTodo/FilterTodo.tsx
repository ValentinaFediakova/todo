import { filters } from '../../constants/filters';
import type { Filter, RootState } from '../../features/todos/types';
import { Button } from '../UI/Button/Button';
import { setFilter } from '../../features/todos/todosSlice';
import { useDispatch, useSelector } from 'react-redux';

import './FilterTodo.scss';

interface FilterTodoProps {
  isOpenMenu: boolean;
  onHandleToggleMenu: () => void;
}

export const FilterTodo: React.FC<FilterTodoProps> = ({ isOpenMenu, onHandleToggleMenu }) => {
  const dispatch = useDispatch()
  const currentFilter = useSelector((state: RootState) => state.todos.filter)
  const handleFilterChange = (filter: Filter) => {
    dispatch(setFilter(filter));
    onHandleToggleMenu();
  };

  return (
    <div className={`filter-todo__content ${isOpenMenu ? 'filter-todo__content_open' : 'filter-todo__content_close'}`}>
      <div className='filter-todo__wrap'>
        {filters.map((filter) => (
          <Button isActive={currentFilter === filter} onHandleClick={() => handleFilterChange(filter)} text={filter.charAt(0).toUpperCase() + filter.slice(1)}/>
        ))}
      </div>

    </div>
  );
}