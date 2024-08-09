import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
    try {
        // Определение id пользователя
        const { _id } = req.user;
        console.log("id пользователя: ", _id);

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
        // Получение id пользователя
        const { _id } = req.user;
        // Получение id контакта из запроса
        const { id } = req.params; 
        // Получение данных контакта, если он принадлежит пользователю
        const contact = await Contact.find({ _id: id, owner: _id });

        // Если контакт не найден
        if ( contact.length === 0) {
            throw HttpError(404);
        };

        // Вывод найденного контакта
        res.json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        // Получение id пользователя
        const { _id } = req.user;
        // Получение id контакта из запроса
        const { id } = req.params; 
        // Получение данных контакта, если он принадлежит пользователю
        const contact = await Contact.findOneAndDelete({ _id: id, owner: _id });

        // Если контакт не найден
        if (!contact) {
            throw HttpError(404);
        };

        // Вывод данных удалённого контакта, если он найден
        res.json(contact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        // Поиск уже существующего контакта
        const newName = req.body.name;
        const oldContact = await Contact.find({ name: newName });
        // Если контакт найден - выдать ошибку
        if (oldContact.length !== 0) {
            res.status(409).json({
                message: "This contact already exists"
            });
            return;
        };

        // Определяем пользователя, который добавляет контакт
        const { _id } = req.user;
        // Добавляем id пользователя в созданный контакт
        const contact = await Contact.create({ ...req.body, owner: _id });
        // Вывод созданного контакта
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        // === Если тело запроса пустое
        const keys = Object.keys(req.body); // Создание массива ключей объекта
        // Если массив ключей пустой (нет данных для обновления) - выдать ошибку
        if (keys.length === 0) {
            const error = new Error("Body must have at least one field");
            error.status = 400;
            throw error;
        };

        // === Если тело запроса не пустое
        // Получение id пользователя
        const { _id } = req.user;
        // Получение id контакта из запроса
        const { id } = req.params; 
        // Обновление контакта, если он найден и принадлежит пользователю
        const contact = await Contact.findOneAndUpdate({ _id: id, owner: _id }, req.body, {new: true});

        // === Если контакт не найден или не принадлежит пользователю (контакт не найден)
        if (!contact) {
            throw HttpError(404);
        };

        // === Вывод найденного и обновлённого контакта
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const updateStatusContact = async (req, res, next) => {
    try {
        // === Если тело запроса пустое
        const keys = Object.keys(req.body); // Создание массива ключей объекта
        // Если массив ключей пустой (нет данных для обновления) - выдать ошибку
        if (keys.length === 0) {
            const error = new Error("Body must have a field 'favorite'");
            error.status = 400;
            throw error;
        };

        // === Если тело запроса не пустое
        // Получение id пользователя
        const { _id } = req.user;
        // Получение id контакта из запроса
        const { id } = req.params; 
        // Обновление контакта, если он найден и принадлежит пользователю
        const contact = await Contact.findOneAndUpdate({ _id: id, owner: _id }, req.body, {new: true});

        // === Если контакт не найден или не принадлежит пользователю (контакт не найден)
        if (!contact) {
            throw HttpError(404);
        };

        // === Вывод найденного и обновлённого контакта
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
}