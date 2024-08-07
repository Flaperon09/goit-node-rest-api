import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
    try {
        // Определение id пользователя
        const { _id } = req.user;

        // Получение параметров запроса (пагинация)
        const { page = 1, limit = 10 } = req.query;
        // - определяем количество пропускаемых данных (пагинация)
        const skip = (page - 1) * limit;

        // Вывод всех контактов данного пользователя
        const contacts = await Contact.find({ owner: _id }, "", { skip, limit: Number(limit)}).populate("owner", "_id name email");
        res.json(contacts);
    }
    catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params; // Получение id контакта
        const contact = await Contact.findById(id);

        // Если контакт не найден
        if (!contact) {
            throw HttpError(404);
        };

        // Если контакт найден
        res.json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);

        // Если контакт не найден
        if (!contact) {
            throw HttpError(404);
        };

        // Если контакт найден
        res.json(contact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        // Определяем пользователя, который добавляет контакт
        const { _id } = req.user;
        // Добавляем id пользователя в созданный контакт
        const contact = await Contact.create({ ...req.body, owner: _id });
        res.status(201).json(contact);
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
        const contact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

        // Если контакт не найден
        if (!contact) {
            throw HttpError(404);
        };

        // Если контакт найден
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const updateStatusContact = async (req, res, next) => {
    try {
        // Если тело запроса пустое
        const keys = Object.keys(req.body); // Создание массива ключей объекта
        // Если массив ключей пустой (нет данных для обновления) - выдать ошибку
        if (keys.length === 0) {
            const error = new Error("Body must have a field 'favorite'");
            error.status = 400;
            throw error;
        };

        // Если тело запроса не пустое
        const { id } = req.params;
        const contact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

        // Если контакт не найден
        if (!contact) {
            throw HttpError(404);
        };

        // Если контакт найден
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
}