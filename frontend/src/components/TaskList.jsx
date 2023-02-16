import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import FAB from './FAB'
import Task from './Task'

const TaskList = () => {

    const [fabState, setFabState] = useState(false)

    const value = useContext(TodoContext)
    const tasks = value.taskList
    const activeTodoId = value.activeTodoId
    const getTodos = value.getTodos

    // Display add task FAB when todo is active
    useEffect(() => {
        getTodos()
        if (activeTodoId) {
            setFabState(true)
        }
    }, [activeTodoId, tasks])

    return (
        <div className='mt-7'>
            <h1 className='text-3xl font-semibold border-b-4 text-headingcolor border-secondary pb-3 mb-1'>Your Tasks</h1>
            <div className="absolute w-full h-4/5 overflow-y-auto overflow-x-hidden pr-2">
                {tasks.length > 0 ? tasks.map((taskItem) =>
                    <Task key={taskItem._id} todoid={activeTodoId} taskid={taskItem._id} task={taskItem.task} />
                ) : <p className="h-full w-full text-2xl flex items-center justify-center">Add some tasks to your todo!</p>}
            </div>
            {fabState && <FAB />}
        </div>
    )
}

export default TaskList