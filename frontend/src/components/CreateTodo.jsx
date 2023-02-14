import React, { useState } from 'react'
import Add from '../assets/add.svg'
import CreateTodoModal from './CreateTodoModal'

const CreateTodo = () => {

    let [isOpen, setIsOpen] = useState(false)


    return (
        <div className="mt-16 border-b-4 border-[#373745]  pb-3 flex flex-row items-center gap-4" onClick={() => setIsOpen(true)}>
            <img src={Add} alt="Add Todo" className='text-white opacity-100' />
            <p className="text-2xl">Create Todo</p>
            {isOpen && <CreateTodoModal isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
    )
}

export default CreateTodo