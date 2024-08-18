import express from "express";
import register from "../controllers/registerControllers.js"; // Импорт контроллера регистрации
import login from "../controllers/loginControllers.js"; // Импорт контроллера входа
import logout from "../controllers/logoutController.js"; // Импорт контроллера выхода
import upload from "../helpers/upload.js"; // Импорт загрузчика аватара
import updateAvatar from "../controllers/updateAvatar.js"; // Импорт контроллера обновления аватара
import validateBody from "../helpers/validateBody.js"; // Импорт валидатора тела запроса
import validateUser from "../helpers/validateUser.js"; // Импорт контролера валидации юзера
import getCurrentUser from "../controllers/getCurrentControllers.js"; // Импорт идентификатора пользователя
import verifyEmail from "../controllers/verifyEmail.js"; // Импорт контроллера рассылки
import checkVerifyEmail from "../controllers/checkVerifyEmail.js"; // Импорт проверки валидации
import userSchema from "../schemas/usersSchemas.js"; // Импорт схем валидации

const usersRouter = express.Router();

// Маршрут регистрации пользователя
usersRouter.post("/register", validateBody(userSchema.registerUserSchema), register);

// Маршрут входа пользователя 
usersRouter.post("/login", validateBody(userSchema.loginUserSchema), login);

// Маршрут выхода пользователя
usersRouter.post("/logout", getCurrentUser, logout);

// Маршрут проверки текущего пользователя
usersRouter.get("/current", getCurrentUser, validateUser);

// Маршрут замены аватара пользователя
usersRouter.patch("/avatars", getCurrentUser, upload.single("avatar"), updateAvatar);

// Маршрут верификации рассылки
usersRouter.get("/verify/:verificationToken", verifyEmail);

// Маршрут проверки верификации
usersRouter.post("/verify", checkVerifyEmail);

export default usersRouter;