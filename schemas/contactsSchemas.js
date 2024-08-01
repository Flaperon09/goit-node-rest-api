import Joi from "joi";

// Настройки валидатора добавляемого контакта
const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
});

// Настройки валидатора обновляемого контакта
const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2}),
    phone: Joi.string(),
    favorite: Joi.bool(),
});

// Настройки валидатора обновляемого поля favorite
const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required()
});

const contactSchema = {
    createContactSchema,
    updateContactSchema,
    updateFavoriteSchema,
}

export default contactSchema;