import React from 'react'
import Search from './Search'
import TaskList from './TaskList'

const Tasks = () => {
    return (
        <div className="bg-white rounded-3xl p-7 h-full w-full">
            <div className="w-full h-full relative">
                <Search />
                <TaskList />
            </div>
        </div>
    )
}

export default Tasks