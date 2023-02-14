import React from 'react'
import Logo from '../assets/Logo.svg'
import CreateTodo from './CreateTodo'
import TodoList from './TodoList'

const Todo = () => {
    return (
        <div className='text-white flex flex-col h-full w-full'>
            <div className="">
                <img src={Logo} alt="Logo" />
            </div>
            <CreateTodo />
            <TodoList />
        </div>
    )
}

export default Todo