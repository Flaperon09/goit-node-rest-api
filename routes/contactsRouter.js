import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js"; // Импорт валидатора
import contactSchema from "../schemas/contactsSchemas.js"; // Импорт схем валидации

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(contactSchema.createContactSchema), createContact);
// contactsRouter.post("/", createContact);

contactsRouter.put("/:id", validateBody(contactSchema.updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", validateBody(contactSchema.updateFavoriteSchema), updateFavorite);

export default contactsRouter;