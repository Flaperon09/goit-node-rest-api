import User from "../models/user.js";
import sendEmail from "../helpers/sendEmail.js"; // Импорт сервиса рассылки

const checkVerifyEmail = async (req, res) => {
    // Получение email из тела запроса
    const { email } = req.body;

    // Если в запросе нет email
    if (!email) {
        res.status(400).json({
            message: 'Missing required field email',
        });
        return;
    };

    // === Поиск в БД уже существующего пользователя по email
    const user = await User.findOne({ email });
    // - Если пользователь не существует - выдать ошибку
    if (!user) {
        res.status(404).json({
            "message": "Email not found"
        });
        return;
    };

    // === Определение статуса верификации
    // Получение значений verify и verificationToken пользователя
    const { verify, verificationToken } = user;
    
    // Если пользователь уже прошел верификацию
    if (verify) {
        res.status(400).json({
            message: 'Verification has already been passed',
        });
        return;
    };

    // Если в запросе есть email и пользователь не верифицирован - отправляем повторное письмо верификации
    // - Письмо для рассылки подтверждения
    const mail = {
        to: email,
        subject: "Подтверждение рассылки",
        html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Подтвердить email</a>`
    };
    // - Отправка письма
    await sendEmail(mail);

    // Ответ сервера при успешной отправке письма повторной верификации
    res.status(200).json({
            message: 'Verification email sent',
    });
};

export default checkVerifyEmail;