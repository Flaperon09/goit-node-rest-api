import User from "../models/user.js"; // Импорт модели пользователя
import jwt from "jsonwebtoken"; // Импорт генератора токенов

// === Работа с переменными окружения
import dotenv from "dotenv"; // Импорт пакета для работы с переменными окружения
dotenv.config(); // Вызов метода config у пакета dotenv
const { SECRET_KEY } = process.env; // Импорт секретного ключа из переменных окружения

const getCurrentUser = async (req, res, next) => {
    // Получаем содержимое заголовка запроса
    const { authorization = "" } = req.headers;
    // Разделяем заголовок на два слова (по пробелу)
    const [bearer, token] = authorization.split(" ");
    // Проверка токена
    try {
        // Если первое слово не "Bearer" - выдать ошибку 401
        if (bearer !== "Bearer") {
            res.status(401).json({
                "message": "Not authorized"
            });
            return;
        };
        // Получаем id пользователя из токена
        const { id } = jwt.verify(token, SECRET_KEY);
        // Если токен валидный - находим пользователя
        const user = await User.findById(id);
        // Если пользователь не найден - выдать ошибку 401
        if (!user || !user.token) {
            res.status(401).json({
            "message": "Not authorized"
            });
            return;
        };
        // Добавляем пользователя к запросу
        req.user = user;
        next();
    } catch (error) {
        // Ели токен невалидный - выдать ошибку 401
        if (error.message === "Invalid signature") {
            error.status = 401;
        }
        next(error);
    }

};

export default getCurrentUser;