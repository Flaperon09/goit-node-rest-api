import User from "../models/user.js"; // Импорт модели пользователя

const validateUser = async (req, res) => {
    const { name, email } = req.user;
    res.json({
        status: "succes",
        code: 200,
        data: {
            user: {
                name,
                email
            }
        }
    })
};

export default validateUser;