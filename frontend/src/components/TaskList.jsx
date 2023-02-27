import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import FAB from './FAB'
import Task from './Task'

const TaskList = () => {
    const [fabState, setFabState] = useState(false)
    const { taskList, activeTodoId } = useContext(TodoContext)

    // Display add task FAB when todo is active
    useEffect(() => {
        activeTodoId ? setFabState(true) : setFabState(false)
    }, [activeTodoId])

    return (
        <div className='mt-7'>
            <h1 className='pb-3 mb-1 text-3xl font-semibold border-b-4 text-headingcolor border-secondary'>Your Tasks</h1>
            <div className="absolute w-full pr-2 overflow-x-hidden overflow-y-auto h-4/5">
                {taskList.length > 0 ? taskList.map((taskItem) =>
                    <Task key={taskItem._id} todoid={activeTodoId} taskItem={taskItem} />
                ) : <p className="flex items-center justify-center w-full h-full text-2xl">{activeTodoId ? "Add some tasks to your todo!" : "Click on a Todo to display Tasks!"}</p>}
            </div>
            {fabState && <FAB />}
        </div>
    )
}

export default TaskList