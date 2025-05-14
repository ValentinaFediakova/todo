import { useState } from 'react'
import { AddTodo } from './components/AddTodo/AddTodo'
import { FilterTodo } from './components/FilterTodo/FilterTodo'
import { Todolist } from './components/Todolist/Todolist'

import './App.scss'

function App() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  
  const handleToggleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
    
  }

  return (
    <div className='app-container'>
      <div className="app-wrap">
        <h1 className="app-title">Todo List</h1>
        <div className='app-mobile-menu' onClick={handleToggleMenu}></div>
        <div className='app-content'>
          <div className='app-todos'>
            <AddTodo/>
            <Todolist />
          </div>
          <FilterTodo isOpenMenu={isOpenMenu} onHandleToggleMenu={handleToggleMenu}/>
        </div>
      </div>
    </div>
  )
}

export default App
