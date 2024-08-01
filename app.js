import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";

// === Подключение к базе данных
import mongoose from "mongoose";
// Импорт пакета для работы с переменными окружения
import dotenv from "dotenv";
// Вызов метода config у пакета dotenv
dotenv.config();
// Импорт ключа к БД "db-contacts" и номера порта из переменной окружения
const { DB_HOST, PORT = 3000 } = process.env;
// 
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

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
})