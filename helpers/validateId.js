import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isValidId = (req, res, next) => {
    const { id } = req.params;
    // Проверка правильности структуры id
    const isCorrect = isValidObjectId(id);
    // Если структура id неправильная - выдать ошибку 400
    if (!isCorrect) {
        const error = HttpError(400);
        next(error);
    };
    next();
};

export default isValidId;