import React from "react";
import Tasks from "../components/Tasks";
import Todo from "../components/Todo";
import { TodoContextProvider } from "../context/TodoContext";

const HomePage = () => {
    return (
        <div>
            <TodoContextProvider>
                <div className="container flex flex-row w-screen h-screen mx-auto p-7 gap-7">
                    <div className="w-2/5 h-full">
                        <Todo />
                    </div>
                    <div className="w-3/5 h-full">
                        <Tasks />
                    </div>
                </div>
            </TodoContextProvider>
        </div>
    );
};

export default HomePage;
