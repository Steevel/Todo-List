const Todo = require("../model/Todo");

// Create Todo
exports.createTodo = async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        tasks: req.body.tasks || [],
    });

    // Check if title is empty
    if (!newTodo.title) {
        res.status(401).send("Title is empty");
    }

    // Saver the todo in the database
    try {
        const createdNewTodo = await newTodo.save();

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            createdNewTodo,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

// Read Todo
exports.getTodos = async (_req, res) => {
    const todos = await Todo.find();

    if (!todos) {
        res.status(401).send("No todos found!");
    }

    try {
        res.status(200).send(todos);
    } catch (error) {
        res.status(401).send(error.message);
    }
};

// Update Todo
exports.editTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({
            success: true,
            message: "Todo updated successfully",
            todo,
            updates: req.body,
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "Todo deleted successfully",
            todo,
        });
    } catch (error) {
        res.status(401).send(error.message);
    }
};

// Create Task
exports.createTask = async (req, res) => {
    const todo = await Todo.findById(req.params.todoid);

    if (!todo) {
        res.status(401).send("Todo not found!");
    }

    try {
        const newTask = req.body.tasks[0];
        todo.tasks.push(newTask);
        await todo.save();
        res.status(200).send({
            success: true,
            message: "Task created successfully",
            tasks: todo.tasks,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Task
exports.editTask = async (req, res) => {
    const { todoid, taskid } = req.params;

    if (!todoid) {
        res.status(401).send("Todo not found!");
    }

    if (!taskid) {
        res.status(401).send("Task not found!");
    }

    try {
        const todo = await Todo.findById(todoid);

        const editedTask = req.body;

        const updatedTasksList = todo.tasks.map((item) => {
            if (item._id == taskid) {
                item.task = editedTask.task;
                item.isCompleted = editedTask.isCompleted;
                return item;
            } else {
                return item;
            }
        });

        todo.tasks = updatedTasksList;

        await Todo.findByIdAndUpdate(todoid, todo);

        res.status(200).send({
            success: true,
            message: "Task edited successfully",
            tasks: todo,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    const { todoid, taskid } = req.params;

    if (!todoid) {
        res.status(401).send("Todo not found!");
    }

    if (!taskid) {
        res.status(401).send("Task not found!");
    }

    try {
        const todo = await Todo.findById(todoid);
        // const isTaskPresent = todo.tasks.filter((item) => item._id == taskId)

        const updatedTasksList = todo.tasks.filter((e) => e._id != taskid);

        todo.tasks = updatedTasksList;

        await Todo.findByIdAndUpdate(todoid, todo);

        res.status(200).send({
            success: true,
            message: "Task deleted successfully",
            tasks: updatedTasksList,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

// Search Todo/Task
exports.search = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        res.status(401).send("Query not found!");
    }

    try {
        // const searchResult = await Todo.find({ $or: [{ 'title': { $regex: query, $options: "i" } }, { 'tasks.task': { $regex: query, $options: "i" } }] })
        const searchResult = await Todo.find({
            $or: [
                { title: new RegExp(query, "i") },
                { tasks: new RegExp(query, "i") },
            ],
        });

        res.status(200).send({
            success: true,
            result: searchResult,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
