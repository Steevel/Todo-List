import React, { useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/TodoContext";

const TodoList = () => {
    const { todoList, getTodos } = useContext(TodoContext);

    useEffect(() => {
        getTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative w-full h-full">
            <div className="absolute w-full h-full pr-2 overflow-y-auto">
                {todoList.length > 0 ? (
                    todoList.map((todo) => <TodoItem key={todo._id} todo={todo} />)
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-2xl text-white">No Todos Found!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;
