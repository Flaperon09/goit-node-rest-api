import User from "../models/user.js";
import bcrypt from "bcryptjs"; // Импорт пакета хеширования пароля
import gravatar from "gravatar"; // Пакет для работы с аватарами

const register = async (req, res) => {
    
    const { email, password } = req.body;

    // === Поиск уже существующего пользователя
    const user = await User.findOne({ email });
    // Если пользователь существует - выдать ошибку
    if (user) {
        res.status(409).json({
            "message": "Email in use"
        });
        return;
    };
    // Если такого пользователя нет, то создать его:
    // Создание аватара пользователя по-умолчанию
    const avatarURL = gravatar.url(email);
    // - Хеширование пароля
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // - Создание пользователя
    const result = await User.create({ email, password: hashPassword, avatarURL });
    // - Ответ сервера
    res.status(201).json({
        user: {
            email,
            subscription: "starter",
            avatarURL
        }
    })
}

export default register;