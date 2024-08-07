import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js"; // Импорт модели пользователя
import bcrypt from "bcryptjs"; // Импорт пакета хеширования пароля
import messageError from "http-errors"; // Импорт пакета выдачи ошибок
import jwt from "jsonwebtoken"; // Импорт генератора токенов

// === Работа с переменными окружения
import dotenv from "dotenv"; // Импорт пакета для работы с переменными окружения
dotenv.config(); // Вызов метода config у пакета dotenv
const { SECRET_KEY } = process.env; // Импорт секретного ключа из переменных окружения

// === Контроллер авторизации пользователя
const login = async (req, res) => {

    const { email, password } = req.body;

    // Поиск уже существующего пользователя по email
    const user = await User.findOne({ email });
    // Если пользователь не существует - выдать ошибку

    // if (!user) {
    //     const error = new Error("Email or password is wrong");
    //     error.status = 401;
    //     throw error;
    // }

    if (!user) {
        res.status(401).json({
            "message": "Email or password is wrong"
        });
        return;
    };

    // if (!user) {
    //     throw HttpError(401);
    //     // throw new messageError.Unauthorized("Email or password is wrong");
    // };

    /* Если пользователь существует - сравнить введённый пароль с 
    с хешированным паролем, сохранённым при регистрации */
    const passCompare = bcrypt.compareSync(password, user.password);
    // Если пароли не совпадают - выдать ошибку

    if (!passCompare) {
        res.status(401).json({
            "message": "Password is wrong"
        });
        return;
    };

    // if (!passCompare) {
    //     throw HttpError(401);
    //     throw new messageError.Unauthorized("Password is wrong");
    // };

    // === Генерирование токена пользователя
    // Полезная нагрузка в виде id пользователя
    const payload = {
        id: user._id
    };
    // Создаём токен
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    // Запись токена в БД
    await User.findByIdAndUpdate(user._id, { token });
    // Возвращаем токен
    res.json({
        status: "success",
        code: 200,
        data: {
            token
        }
    })
};

export default login;