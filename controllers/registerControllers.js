import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs"; // Импорт пакета хеширования пароля

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // === Поиск уже существующего пользователя
    const user = await User.findOne({ email });
    // Если пользователь существует - выдать ошибку

    // if (user) {
    //     res.status(409).json({
    //         Status: "409 Conflict",
    //         ResponseBody: {
    //             "message": "Email in use"
    //         }
    //     });
    //     return;
    // };

    if (user) {
        res.status(409).json({
            "message": "Email in use"
        });
        return;
    };

    // Если такого пользователя нет, то создать его:
    // - Хеширование пароля
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // - Создание пользователя
    const result = await User.create({ name, email, password: hashPassword });
    // - Ответ сервера
    res.status(201).json({
        Status: "201 Created",
        ResponseBody: {
            user: {
                name,
                email,
                subscription: "starter"
            }
        }
    })
}

export default register;