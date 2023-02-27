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
        <div className="flex flex-col w-full h-full text-white">
            <div className="">
                <img src={Logo} alt="Logo" onClick={() => reloadPage()} />
            </div>
            <CreateTodo />
            <TodoList />
        </div>
    );
};

export default Todo;
