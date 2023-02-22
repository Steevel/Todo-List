const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: "string",
            required: [true, "Name is required"],
            trim: true,
            maxlength: [25, "Name should not exceed 25 characters"],
        },
        email: {
            type: "string",
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: "string",
            select: false,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
