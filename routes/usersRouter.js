import express from "express";

import register from "../controllers/registerControllers.js"; // Импорт контроллера регистрации
import login from "../controllers/loginControllers.js"; // Импорт контроллера входа
import validateBody from "../helpers/validateBody.js"; // Импорт валидатора тела запроса
import userSchema from "../schemas/usersSchemas.js"; // Импорт схем валидации

const usersRouter = express.Router();

// Маршрут регистрации пользователя
usersRouter.post("/register", validateBody(userSchema.registerUserSchema), register);

// Маршрут входа пользователя 
usersRouter.post("/login", validateBody(userSchema.loginUserSchema), login);

export default usersRouter;