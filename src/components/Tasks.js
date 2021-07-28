import React from 'react';
import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
//destructuring props and passing it
//if you pass props thenthe synatx will be props.task.id, etc.
    return (
        <>
            {tasks.map((task)=>(
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}
            {/* have to pass the key attribute,since it is the list */}
        </>
    )
}

export default Tasks
