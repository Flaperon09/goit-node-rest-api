import { Schema, model } from "mongoose";
    
// Схема контактов
const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, { versionKey: false });

// Обработка ошибок работы с БД (установка необходимых статусов)
const HandleErrors = (error, data, next) => {
    const { name, code } = error;
    if (name === "MongoServerError" && code === 11000) {
        error.status = 409;
    } else {
        error.status = 400;
    };
    next();
};
contactSchema.post("save", HandleErrors);

// Модель контактов
const Contact = model("contact", contactSchema);

export default Contact;