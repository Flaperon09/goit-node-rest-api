import Joi from "joi";

// Настройки валидатора добавляемого контакта
const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

export const updateContactSchema = Joi.object({

});

export default createContactSchema;