import express from "express";
import morgan from "morgan";
import cors from "cors";

import usersRouter from "./routes/usersRouter.js";
import contactsRouter from "./routes/contactsRouter.js";

// Подключение к базе данных
import mongoose from "mongoose";

// === Работа с переменными окружения
import dotenv from "dotenv"; // Импорт пакета для работы с переменными окружения
dotenv.config(); // Вызов метода config у пакета dotenv
const { DB_HOST, PORT = 3000 } = process.env; // Импорт секретного ключа из переменных окружения

mongoose.set("strictQuery", true);
// Подключение к БД
mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    // Запуск сервера
    app.listen(PORT, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Разрешение на передачу статичных файлов

// Обработчик запросов авторизации
app.use("/users", usersRouter);
// Обработчик запросов контактов
app.use("/api/contacts", contactsRouter);
// Обработчик загрузки файлов


app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
})