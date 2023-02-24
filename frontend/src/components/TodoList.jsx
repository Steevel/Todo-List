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
        <div className="w-full h-full relative">
            <div className="absolute w-full h-full overflow-y-auto pr-2">
                {todoList.length > 0 ? (
                    todoList.map((todo) => <TodoItem key={todo._id} todo={todo} />)
                ) : (
                    <div className="h-full flex justify-center items-center">
                        <p className="text-white text-2xl">No Todos Found!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;
