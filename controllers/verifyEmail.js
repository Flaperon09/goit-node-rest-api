import User from "../models/user.js";

const verifyEmail = async (req, res) => {
    // Определение токена из параметров запроса
    const { verificationToken } = req.params;
    // Поиск в БД пользователя по токену
    const user = await User.findOne({ verificationToken });
    // Если пользователь не найден - выдать ошибку
    if (!user) {
        res.status(404).json({
            message: 'User not found',
        });
        return;
    }
    // Если пользователь найден - обнулить токен авторизации
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    // Ответ сервера
    res.status(200).json({
        message: 'Verification successful',
    });
};

export default verifyEmail;