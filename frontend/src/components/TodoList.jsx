import React, { useContext, useEffect } from 'react'
import TodoItem from './TodoItem'
import { TodoContext } from '../context/TodoContext'

const TodoList = () => {
    const { todoList, getTodos } = useContext(TodoContext)

    useEffect(() => {
        getTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full h-full relative">
            <div className="absolute w-full h-full overflow-y-auto pr-2">
                {todoList.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </div>
        </div>
    )
}

export default TodoList