import './index.css'
import TaskInput from './components/AddNewTasks.jsx';
import Tasks from './components/Tasks.jsx';

function App() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='my-7 text-white text-3xl uppercase font-bold'>Todo List ✍ </h1>
      <TaskInput />
      <Tasks/>
    </div>
  )
}


export default App
