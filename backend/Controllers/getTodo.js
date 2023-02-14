const Todo = require('../model/Todo')

exports.getTodo = async (req, res) => {

    const todoId = req.params.id;
    const todo = await Todo.findById(todoId);

    if (!todo) {
        res.status(401).send("Todo Not found!")
    }

    try {
        res.status(200).send(todo)
    } catch (error) {
        res.status(401).send(error.message)
    }
}