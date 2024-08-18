import sgMail from "@sendgrid/mail"; // Импорт сервиса рассылки

// === Работа с переменными окружения
import dotenv from "dotenv"; // Импорт пакета для работы с переменными окружения
dotenv.config(); // Вызов метода config у пакета dotenv

// Определение ключа из переменных окружения
const { SENDGRID_API_KEY } = process.env;

// Передача ключа в сервис рассылки
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "kasyanenko.yuriy@gmail.com" };
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw error;
    }
};

export default sendEmail;

