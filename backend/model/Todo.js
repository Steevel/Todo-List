const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            trim: true,
            required: [true, "Title is required"],
        },
        isDone: {
            type: Boolean,
            default: false,
        },
        tasks: [
            {
                task: {
                    type: String,
                    trim: true,
                    required: [true, "Task is required"],
                },
                isCompleted: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
