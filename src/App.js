import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from 'react';

function App() {

  const [showAddTask, setshowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect( () => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')

    const data = await res.json()
    
    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)

    const data = await res.json()
    
    return data
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })

    setTasks(tasks.filter((task)=>task.id!==id));
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks,data])

    // const id = Math.floor(Math.random()*1000+4)
    // const newTask = {id, ...task}
    // console.log(newTask)
    // setTasks([...tasks,newTask])
  }

  //Set Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id ===id ? {
          ...task, reminder: data.reminder
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
