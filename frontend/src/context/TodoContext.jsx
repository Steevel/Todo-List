import React, { createContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/helper";

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
        const res = await axios.get(`${BASE_URL}/todo/gettodos`, {
            withCredentials: true,
        });
        setTodoList(res.data);
    };

    // Create todo
    const createTodo = async (todoTitle) => {
        await axios.post(
            `${BASE_URL}/todo/createtodo`,
            {
                title: todoTitle,
            },
            { withCredentials: true }
        );
        getTodos();
    };

    // Delete todo
    const deleteTodo = async (todoId) => {
        await axios.delete(`${BASE_URL}/todo/deletetodo/${todoId}`);
        getTodos();
        setTaskList([]);
        setActiveTodoId("");
    };

    // Edit todo
    const editTodo = async (updatedTodo) => {
        try {
            await axios.put(
                `${BASE_URL}/todo/edittodo/${updatedTodo._id}`,
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
        await axios.delete(`${BASE_URL}/todo/deletetask/${todoid}/${taskid}`);
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
            `${BASE_URL}/todo/edittask/${todoid}/${taskid}`,
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
        const res = await axios.post(`${BASE_URL}/todo/createtask/${todoid}`, {
            tasks: [
                {
                    task: newTask,
                },
            ],
        });

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
            const res = await axios.get(`${BASE_URL}/todo/search?q=${query}`, {
                withCredentials: true,
            });
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
