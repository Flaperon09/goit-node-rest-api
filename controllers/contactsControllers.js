import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js"

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

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.deleteContact(id);

        // Если контакт не найден
        if (!result) {
            throw HttpError(404);
        };

        // Если контакт найден
        res.json({
            status: "success",
            code: 200,
            message: "Contact deleted",
            data: {
                result
            }
        });
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
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

export const updateContact = async (req, res, next) => {
    try {
        // Если тело запроса пустое
        const keys = Object.keys(req.body); // Создание массива ключей объекта
        // Если массив ключей пустой (нет данных для обновления) - выдать ошибку
        if (keys.length === 0) {
            const error = new Error("Body must have at least one field");
            error.status = 400;
            throw error;
        };

        // Если тело запроса не пустое
        const { id } = req.params;
        const result = await contactsService.updateById(id, req.body);

        // Если контакт не найден
        if (!result) {
            throw HttpError(404);
        };

        // Если контакт найден
        res.status(200).json({
            status: "success",
            code: 200,
            data: {
                result
            }
        });
    } catch (error) {
        next(error);
    }
};