import { Schema, SchemaTypes, model } from "mongoose";
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  }
}, { versionKey: false });

// Инструкция для contactSchema по обработке ошибок с помощью schemaErrors
contactSchema.post("save", schemaErrors);

// Модель контактов
const Contact = model("contact", contactSchema);

export default Contact;