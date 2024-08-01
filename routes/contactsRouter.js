import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js"; // Импорт валидатора
import contactSchema from "../schemas/contactsSchemas.js"; // Импорт схем валидации

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(contactSchema.createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(contactSchema.updateContactSchema), updateContact);

export default contactsRouter;