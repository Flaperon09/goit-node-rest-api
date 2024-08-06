import Joi from "joi";

// Настройки валидатора данных регистрации нового пользователя
const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
});

// Настройки валидатора данных входа пользователя
const loginUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
});

const userSchema = {
    registerUserSchema,
    loginUserSchema
};

export default userSchema;