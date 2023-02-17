import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import FAB from './FAB'
import Task from './Task'

const TaskList = () => {
    const [fabState, setFabState] = useState(false)
    const { taskList, activeTodoId, getTodos } = useContext(TodoContext)

    // Display add task FAB when todo is active
    useEffect(() => {
        getTodos()
        activeTodoId ? setFabState(true) : setFabState(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTodoId, taskList])

    return (
        <div className='mt-7'>
            <h1 className='text-3xl font-semibold border-b-4 text-headingcolor border-secondary pb-3 mb-1'>Your Tasks</h1>
            <div className="absolute w-full h-4/5 overflow-y-auto overflow-x-hidden pr-2">
                {taskList.length > 0 ? taskList.map((taskItem) =>
                    <Task key={taskItem._id} todoid={activeTodoId} taskItem={taskItem} />
                ) : <p className="h-full w-full text-2xl flex items-center justify-center">{activeTodoId ? "Add some tasks to your todo!" : "Click on a Todo to display Tasks!"}</p>}
            </div>
            {fabState && <FAB />}
        </div>
    )
}

export default TaskList