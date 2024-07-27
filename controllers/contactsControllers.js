import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js"
import createContactSchema from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactsService.listContact();
        res.json({
            status: "success",
            code: 200,
            data: {
                contacts
            }
        });
    }
    catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params; // Получение id контакта
        const contact = await contactsService.getContactById(id);

        // Если контакт не найден
        if (!contact) {
            throw HttpError(404);
        };

        // Если контакт найден
        res.json({
            status: "success",
            code: 200,
            data: {
                contact
            }
        });
    } catch (error) {
        next(error);
    }
};

export const deleteContact = (req, res) => {};

export const createContact = async (req, res, next) => {
    try {
        // Валидация добавляемого контакта
        // validateBody(createContactSchema);

        const { error } = createContactSchema.validate(req.body);
        // Если валидация с ошибками
        if (error) {
            error.status = 400;
            throw error;
        }
        // Если валидация успешная
        const result = await contactsService.addContact(req.body);
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result
            }
        });
    } catch (error) {
        next(error);
    }
};

export const updateContact = (req, res) => {};