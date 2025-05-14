import './App.scss'
import { AddTodo } from './components/AddTodo/AddTodo'
import { FilterTodo } from './components/FilterTodo/FilterTodo'
import { Todolist } from './components/Todolist/Todolist'

function App() {

  return (
    <div className='app-container'>
      <div className="app-wrap">
        <h1 className="app-title">Todo List</h1>
        <div className='app-content'>
          <div className='app-todos'>
            <AddTodo/>
            <Todolist />
          </div>
          <FilterTodo />
        </div>
      </div>
    </div>
  )
}

export default App
