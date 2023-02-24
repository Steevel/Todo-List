import React, { createContext, useState } from "react";
import axios from "axios";

export const TodoContext = createContext();

export const TodoContextProvider = (props) => {
    const [todoList, setTodoList] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [activeTodoId, setActiveTodoId] = useState("");

    /*
                =================== TODOS ===================
              */

    // Get all todos
    const getTodos = async () => {
        const res = await axios.get("http://localhost:4000/api/todo/gettodos", {
            withCredentials: true,
        });
        setTodoList(res.data);
    };

    // Create todo
    const createTodo = async (todoTitle) => {
        await axios.post(
            "http://localhost:4000/api/todo/createtodo",
            {
                title: todoTitle,
            },
            { withCredentials: true }
        );
        getTodos();
    };

    // Delete todo
    const deleteTodo = async (todoId) => {
        await axios.delete(`http://localhost:4000/api/todo/deletetodo/${todoId}`);
        getTodos();
        setTaskList([]);
        setActiveTodoId("");
    };

    // Edit todo
    const editTodo = async (updatedTodo) => {
        try {
            await axios.put(
                `http://localhost:4000/api/todo/edittodo/${updatedTodo._id}`,
                updatedTodo
            );
            getTodos();
        } catch (error) {
            console.log("Error while editing Todo: " + error.message);
        }
    };

    /*
                =================== TASKS ===================
              */

    // Set the tasks for active todo
    const setTasks = async (todoId) => {
        todoList.map((todo) => {
            if (todo._id === todoId) {
                setTaskList(todo.tasks);
                setActiveTodoId(todo._id);
            }
            return null;
        });
    };

    // Delete a task
    const deleteTask = async (todoid, taskid) => {
        await axios.delete(
            `http://localhost:4000/api/todo/deletetask/${todoid}/${taskid}`
        );
        const updatedTasks = taskList.filter((task) => task._id !== taskid);
        const updatedTodos = todoList.map((todo) => {
            if (todo._id === todoid) {
                todo.tasks = updatedTasks;
                return todo;
            }
            return todo;
        });
        setTodoList(updatedTodos);
        setTaskList(updatedTasks);
    };

    // Edit task
    const editTask = async (todoid, taskid, updatedtask) => {
        // Update task in the backend
        await axios.put(
            `http://localhost:4000/api/todo/edittask/${todoid}/${taskid}`,
            updatedtask
        );

        // Update task in the frontend
        const updatedTaskList = taskList.filter((taskItem) => {
            if (taskItem._id === taskid) {
                taskItem.task = updatedtask.task;
                taskItem.isCompleted = updatedtask.isCompleted;
            }

            return taskItem;
        });
        setTaskList(updatedTaskList);
    };

    // Create task
    const createTask = async (todoid, newTask) => {
        const res = await axios.post(
            `http://localhost:4000/api/todo/createtask/${todoid}`,
            {
                tasks: [
                    {
                        task: newTask,
                    },
                ],
            }
        );

        // Update the task list
        const updatedTaskArray = res.data.tasks;

        const updatedTodoList = todoList.map((todo) => {
            if (todo._id === todoid) {
                todo.tasks = updatedTaskArray;
                return todo;
            }
            return todo;
        });
        setTodoList(updatedTodoList);
        setTaskList(updatedTaskArray);
    };

    // Search Todo
    const search = async (query) => {
        try {
            const res = await axios.get(
                `http://localhost:4000/api/todo/search?q=${query}`,
                { withCredentials: true }
            );
            const resultArray = res.data.searchResult;
            setTodoList(resultArray);

            // If the the search result is not empty set the first todo in the result as active and display its tasks
            if (resultArray.length > 0) {
                setActiveTodoId(resultArray[0]._id);
                setTaskList(resultArray[0].tasks);
            }
        } catch (e) {
            console.log("Context searh error ", e.message);
        }
    };

    return (
        <TodoContext.Provider
            value={{
                todoList,
                setTasks,
                deleteTask,
                taskList,
                editTask,
                createTask,
                getTodos,
                activeTodoId,
                createTodo,
                deleteTodo,
                editTodo,
                search,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};
