import { Schema, model } from "mongoose";
import schemaErrors from "../helpers/validateSchemaErrors.js";
    
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

// Инструкция для contactSchema по обработке ошибок с помощью schemaErrors
contactSchema.post("save", schemaErrors);

// Модель контактов
const Contact = model("contact", contactSchema);

export default Contact;