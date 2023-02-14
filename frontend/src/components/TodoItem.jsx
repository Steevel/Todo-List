import React, { useContext } from 'react'
import { TodoContext } from '../context/TodoContext'
import TodoDropdown from './TodoDropdown'


const TodoItem = ({ todo }) => {

    const value = useContext(TodoContext)
    const setTasks = value.setTasks

    function handleClick() {
        setTasks(todo._id)
    }

    return (
        <div className="text-white bg-white bg-opacity-10 hover:bg-primary mt-7 h-12 p-3 flex flex-row items-center rounded-xl" onClick={handleClick}>
            <input type="checkbox" className="h-5 w-5 ml-0.5 rounded-full accent-primary todo-rounded-checkbox" />
            <p className="text-lg ml-2 flex-1">{todo.title}</p>
            <div className="flex flex-row items-center gap-2">
                <span className="bg-white bg-opacity-20 h-6 w-6 p-4 rounded-md flex items-center justify-center">{todo.tasks.length}</span>
                <TodoDropdown todoId={todo._id} todoTitle={todo.title} />
            </div>
        </div>
    )
}

export default TodoItem