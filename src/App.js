import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from 'react';

function App() {

  const [showAddTask, setshowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect( () => {
    const fetchTasks = async () => {
      const res = await fetch('')
    }
  })

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task)=>task.id!==id));
  }

  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random()*1000+4)
    const newTask = {id, ...task}
    console.log(newTask)
    setTasks([...tasks,newTask])
  }

  //Set Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id ===id ? {
          ...task, reminder: !task.reminder
        } : task
      )
    )
  }

  return (
    <div className="container">
      <Header onClickAdd={()=>setshowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {/* && is a shorter way of using ternary operator when there is no else condition */}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
        ) : (
          'No Tasks'
        )}
    </div>
  );
}

export default App;
