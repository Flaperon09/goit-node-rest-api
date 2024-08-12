import User from "../models/user.js";
import { join } from "path"; // Пакет работы с путями к файлам
import fs from "fs/promises"; // Пакет работы с файлами
import { error } from "console";
import Jimp from "jimp"; // Пакет обработки аватара

// Путь к папке avatars
const __dirname = import.meta.dirname;
const avatarsDir = join(__dirname, "../public/avatars");

const updateAvatar = async (req, res) => {
    // Если загружаемый файл не найден
    if (!req.file) {
        res.json({ message: "File not found" });
        throw error;
    };

    // Получение пути к временной папке и оригинального имени файла
    const { path: tempUpload, originalname } = req.file;

    const { _id: id } = req.user; // Получение id пользователя
    const avatarName = `${id}_${originalname}`; // Имя аватара с уникальным id
    
    try {

        const resultUpload = join(avatarsDir, avatarName);

        // Перемещение файла из папки tempUpload в папку resultUpload
        await fs.rename(tempUpload, resultUpload);

        const avatarURL = join("public", "avatars", avatarName);
        // Сохранение нового аватара
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        // Если файл не перемещён - удалить его из временной папки
        await fs.unlink(tempUpload);
        throw error;
    }
};
 export default updateAvatar