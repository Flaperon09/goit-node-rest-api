import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js"; // Импорт валидатора тела запроса
import getCurrentUser from "../controllers/getCurrentControllers.js"; // Импорт идентификатора пользователя
import isValidId from "../helpers/validateId.js"; // Импорт валидатора id
import contactSchema from "../schemas/contactsSchemas.js"; // Импорт схем валидации

const contactsRouter = express.Router();

contactsRouter.get("/", getCurrentUser, getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", getCurrentUser, validateBody(contactSchema.createContactSchema), createContact);

contactsRouter.put("/:id", isValidId, validateBody(contactSchema.updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", isValidId, validateBody(contactSchema.updateFavoriteSchema), updateStatusContact);

export default contactsRouter;