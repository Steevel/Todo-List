import React, { useState } from 'react'
import AddIcon from '../assets/fab.svg'
// import { TodoContext } from '../context/TodoContext'
import CreateTaskModal from './CreateTaskModal'

const FAB = () => {

    let [isOpen, setIsOpen] = useState(false)
    // const value = useContext(TodoContext)

    const handleCreateTask = () => {
        setIsOpen(true)
    }

    return (
        <button title="Add Task" className="absolute z-90 bottom-0 right-0 bg-primary w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl" onClick={() => handleCreateTask()}>
            <img src={AddIcon} alt="Add Task" className='mt-2' />
            {isOpen && <CreateTaskModal isOpen={isOpen} setIsOpen={setIsOpen} />}
        </button>
    )
}

export default FAB