import User from "../models/user.js";
import { join } from "path"; // Пакет работы с путями к файлам
import fs from "fs/promises"; // Пакет работы с файлами
import resizeImage from "../helpers/resizeImage.js";
import HttpError from "../helpers/HttpError.js";

// Путь к папке avatars
const __dirname = import.meta.dirname;
const avatarsDir = join(__dirname, "../public/avatars");

const updateAvatar = async (req, res) => {
    // Если загружаемый файл не найден - выдать ошибку
    if (!req.file) {
        res.status(404).json({ message: "File not found" });
        return;
    };

    // Получение пути к временной папке и оригинального имени файла
    const { path: tempUpload, originalname } = req.file;

    // Получение id пользователя
    const { _id: id } = req.user; 

    // Обработка изображения с помощью JIMP
    await resizeImage(tempUpload);

    // Получение имени аватара с уникальным id
    const avatarName = `${id}_${originalname}`; 
    
    try {
        // Путь к файлу аватара в папке /public/avatars
        const resultUpload = join(avatarsDir, avatarName);

        // Перемещение файла из папки tempUpload в папку resultUpload
        await fs.rename(tempUpload, resultUpload);

        // Получение URL аватара
        const avatarURL = join("avatars", avatarName);

        // Сохранение нового аватара
        await User.findByIdAndUpdate(req.user._id, { avatarURL });

        // Возврат ответа с URL аватара
        res.json({ avatarURL });

    } catch (error) {
        // Если файл не перемещён - удалить его из временной папки
        await fs.unlink(tempUpload);
        throw HttpError(404);
    }
};
 export default updateAvatar