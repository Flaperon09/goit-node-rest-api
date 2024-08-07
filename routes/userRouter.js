// Роутер проверки авторизированного пользователя

import express from "express";
import getCurrentUser from "../helpers/validateUser.js";
import validateUser from "../controllers/getCurrentControllers.js"; // Импорт контролера валидации юзера

const userRouter = express.Router();

// Маршрут для проверки авторизации пользователя
userRouter.get("/current", validateUser, getCurrentUser);

export default userRouter;