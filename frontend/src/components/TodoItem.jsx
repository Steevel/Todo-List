import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import TodoDropdown from './TodoDropdown'


const TodoItem = ({ todo }) => {

    const [isChecked, setIsChecked] = useState(todo.isDone)
    const { setTasks, editTodo, activeTodoId, taskList } = useContext(TodoContext)

    function handleChecked() {
        const checked = !isChecked
        setIsChecked(checked)
        const updatedTodo = { ...todo, isDone: checked }
        editTodo(updatedTodo)
    }

    function handleClick() {
        setTasks(todo._id)
    }

    return (
        <div className={`text-white ${activeTodoId === todo._id ? "bg-primary" : "bg-white bg-opacity-10"}  hover:bg-primary mt-7 h-12 p-3 flex flex-row items-center rounded-xl`} onClick={handleClick}>
            <input type="checkbox" className="h-5 w-5 ml-0.5 rounded-full accent-primary todo-rounded-checkbox" checked={isChecked} onChange={handleChecked} />
            <p className={`text-lg ml-2 flex-1 ${isChecked ? "line-through" : null}`}>{todo.title}</p>
            <div className="flex flex-row items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 p-4 bg-white rounded-md bg-opacity-20">{todo._id === activeTodoId ? taskList.length : todo.tasks.length}</span>
                <TodoDropdown todo={todo} />
            </div>
        </div>
    )
}

export default TodoItem