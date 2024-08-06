import { Schema, model } from "mongoose";

// Схема регистрации нового пользователя
const userSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    token: {
        type: String,
        default: null
    }
}, { versionKey: false });

// Модель регистрации нового пользователя
const User = model("user", userSchema);

export default User;