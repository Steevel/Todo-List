import React, { useContext, useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { TodoContext } from '../context/TodoContext'

const TodoList = () => {
    const [isActive, setIsActive] = useState(false)
    const value = useContext(TodoContext)
    const todoList = value.todoList
    const getTodos = value.getTodos

    function handleClick() {
        setIsActive(isActive)
        console.log("isActive", isActive);
        console.log("item clicked");
    }

    useEffect(() => {
        getTodos();
    }, []);
    return (
        <div className="w-full h-full relative">
            <div className="absolute w-full h-full overflow-y-auto pr-2">
                {todoList.map((todo, i) => (
                    <TodoItem key={todo._id} todo={todo} handleClick={handleClick} />
                ))}
            </div>
        </div>
    )
}

export default TodoList