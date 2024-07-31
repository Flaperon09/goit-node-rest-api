import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";

// === Подключение к базе данных
import mongoose from "mongoose";
// Ключ для подключение к БД "db-contacts"
const DB_HOST = "mongodb+srv://Yurii:testpilot1974@cluster0.ki6kk7o.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0";
// Подключение к БД
mongoose.connect(DB_HOST)
  .then(()=> console.log("Database connect success"))
  .catch(error => console.log(error.message));

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
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});