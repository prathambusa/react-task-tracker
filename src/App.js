import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from 'react';

function App() {

  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: "Doctor's Appointment",
        day: "Feb 5th - 11.30AM",
        reminder: true,
      },
      {
        id: 2,
        text: "Meeting at School",
        day: "Feb 6th - 9.30AM",
        reminder: true,
      },
      {
        id: 3,
        text: "Grocery Shopping",
        day: "Feb 5th - 4.30AM",
        reminder: false,
      }
    ]
)

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task)=>task.id!==id));
  }

  //Add Task

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
      <Header/>
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
        ) : (
          'No Tasks'
        )}
    </div>
  );
}

export default App;
