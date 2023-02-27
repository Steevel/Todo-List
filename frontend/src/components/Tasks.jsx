import React from 'react'
import Search from './Search'
import TaskList from './TaskList'

const Tasks = () => {
    return (
        <div className="w-full h-full bg-white rounded-3xl p-7">
            <div className="relative w-full h-full">
                <Search />
                <TaskList />
            </div>
        </div>
    )
}

export default Tasks