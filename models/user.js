import str from "joi";
const { string } = str;
import { Schema, model } from "mongoose";

// Схема регистрации нового пользователя
const userSchema = Schema({
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        minlength: 6
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "buisness"],
        default: "starter"
    },
    token: {
        type: String,
        default: null
    },
    avatarURL: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false });

// Модель регистрации нового пользователя
const User = model("user", userSchema);

export default User;