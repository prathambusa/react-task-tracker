import React from 'react';
import {FaTimes} from 'react-icons/fa';

const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder': '' }`} onDoubleClick={() => onToggle(task.id)}> 
        {/* `task ${task.reminder ? 'reminder': '' }` means-  if task.reminder is true add reminder to className */}
            <h3>
                {task.text} 
                <FaTimes onClick={()=>onDelete(task.id)} style={{color: 'red', cursor: 'pointer'}} />
            </h3>
            <p>{task.dateTime}</p>
        </div>
    )
}

export default Task
