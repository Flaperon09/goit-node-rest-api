import User from "../models/user.js"; // Импорт модели пользователя

const logout = async (req, res) => {
    // Определения пользователя
    const { _id } = req.user;
    // Обнуление токена пользователя в БД
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
};

export default logout;