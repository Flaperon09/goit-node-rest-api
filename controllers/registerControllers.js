import User from "../models/user.js";
import bcrypt from "bcryptjs"; // Импорт пакета хеширования пароля
import gravatar from "gravatar"; // Пакет для работы с аватарами
import { nanoid } from "nanoid"; // Пакет генерации случайных чисел
import sendEmail from "../helpers/sendEmail.js"; // Импорт сервиса рассылки

const register = async (req, res) => {
    
    const { email, password } = req.body;

    // === Поиск уже существующего пользователя
    const user = await User.findOne({ email });
    // === Если пользователь существует - выдать ошибку
    if (user) {
        res.status(409).json({
            "message": "Email in use"
        });
        return;
    };
    // === Если такого пользователя нет, то создать его:
    // Генерация токена верификации пользователя
    const verificationToken = nanoid();
    // Создание аватара пользователя по-умолчанию
    const avatarURL = gravatar.url(email);
    // - Хеширование пароля
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), verificationToken);
    // - Создание пользователя
    const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
    // Письмо для рассылки подтверждения
    const mail = {
        to: email,
        subject: "Подтверждение рассылки",
        html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Подтвердить email</a>`
    };
    // Отправка письма
    await sendEmail(mail);
    // - Ответ сервера
    res.status(201).json({
        user: {
            email,
            subscription: "starter",
            avatarURL,
            verificationToken
        }
    })
}

export default register;