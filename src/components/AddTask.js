import React from 'react';
import {useState} from 'react';

const AddTask = ({onAdd}) => {

    const [text, setText] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text){
            alert('Please add Task')
            return
        }

        onAdd({text, dateTime, reminder})

        setText('')
        setDateTime('')
        setReminder(false)
    }

    return (
        <form style={{marginBottom: 30}} onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="">Task</label>
                <input
                    type="text" 
                    placeholder='Add Task' 
                    checked={reminder}
                    value={text} 
                    onChange={(e)=>setText(e.target.value)} />
                    {/* 'e' is event object, latest event triggered. value and onChange is like a loop. Whenever anything is typed the state is updated and the 
                    value is text typed. When it is auto cleared, the state is updated again and made blank */}
            </div>
            <div className="form-control">
                <label htmlFor="">Date - Time</label>
                <input 
                    type="text"
                    placeholder='eg Jan 7th - 8.30PM '
                    value={dateTime} 
                    onChange={(e)=>setDateTime(e.target.value)}/>
            </div>
            <div className="form-control form-control-check">
                <label htmlFor=""> Set Reminder</label>
                <input 
                    type="checkbox"
                    value={reminder} 
                    onChange={(e)=>setReminder(e.currentTarget.checked)}/>
            </div>

            <input className='btn btn-block' type="submit" value='Save Task' />
        </form>
    )
}

export default AddTask
