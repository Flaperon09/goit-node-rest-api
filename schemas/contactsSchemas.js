import Joi from "joi";

// Настройки валидатора добавляемого контакта
const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    phone: Joi.string().required(),
});

// Настройки валидатора обновляемого контакта
const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2}),
    phone: Joi.string(),
});

const contactSchema = {
    createContactSchema,
    updateContactSchema
}

export default contactSchema;