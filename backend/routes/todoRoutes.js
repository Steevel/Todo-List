const express = require('express');
const router = express.Router();
const { getTodo } = require('../Controllers/getTodo')

const { createTodo, getTodos, editTodo, deleteTodo, createTask, editTask, deleteTask, search } = require('../Controllers/TodoController')

router.get('/', (req, res) => {
    res.send("<h1>Welcome to Todo App!</h1>")
})

// Create a new Todo 
router.post('/createtodo', createTodo)

// Get all the Todos
router.get('/gettodos', getTodos)

// Get one particular Todo
router.get('/gettodo/:id', getTodo)

// Delete a Todo
router.delete('/deletetodo/:id', deleteTodo)

// Edit a Todo
router.put('/edittodo/:id', editTodo)

// Create a new task
router.post('/createtask/:todoid', createTask)

// Delete a task
router.delete('/deletetask/:todoid/:taskid', deleteTask);

// Edit a task
router.put('/edittask/:todoid/:taskid', editTask);

// Search Todo/Task
router.get('/search', search);

// Export the router
module.exports = router;