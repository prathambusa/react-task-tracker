import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from 'react';

function App() {

  const [showAddTask, setshowAddTask] = useState(false)

  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: "Doctor's Appointment",
        dateTime: "Feb 5th - 11.30AM",
        reminder: true,
      },
      {
        id: 2,
        text: "Meeting at School",
        dateTime: "Feb 6th - 9.30AM",
        reminder: true,
      },
      {
        id: 3,
        text: "Grocery Shopping",
        dateTime: "Feb 5th - 4.30AM",
        reminder: false,
      }
    ]
)

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
