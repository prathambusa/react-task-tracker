import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

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
    <Router>
      <div className="container">
        <Header onClickAdd={()=>setshowAddTask(!showAddTask)} showAddTask={showAddTask}/>
        
          <Route path='/' exact render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              {/* && is a shorter way of using ternary operator when there is no else condition */}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                ) : (
                  'No Tasks'
                )}
            </>
          ) } />

          <Route path='/about' component={About} />
          <Footer />
      </div>
    </Router>
    
  );
}

export default App;
