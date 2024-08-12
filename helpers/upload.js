import multer from "multer";
import { join } from "path"; // Пакет работы с путями

// Путь к временной папке
const __dirname = import.meta.dirname;
const tempDir = join(__dirname, "../temp");

// Объект настроек считывания и сохранения файлов для multer
const multerConfig = multer.diskStorage({
  // Путь к временной папке храниния файлов temp 
  destination: (req, file, cb) => {
    cb(null, tempDir);     
  },
  // Название, с которым будет сохранятся файл
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Сохраняем с исходным именем
  },
  // Ограничения на загрузку файлов
  limits: {
    fileSize: 32768 // Не больше 32 кб
  }
});

// Мидллвар загрузки файлов
const upload = multer({
  storage: multerConfig
});

export default upload;