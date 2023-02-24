import React, { useContext } from "react";
import Logo from "../assets/Logo.svg";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import { TodoContext } from "../context/TodoContext";

const Todo = () => {
    const { getTodos } = useContext(TodoContext);

    function reloadPage() {
        getTodos();
    }

    return (
        <div className="text-white flex flex-col h-full w-full">
            <div className="">
                <img src={Logo} alt="Logo" onClick={() => reloadPage()} />
            </div>
            <CreateTodo />
            <TodoList />
        </div>
    );
};

export default Todo;
