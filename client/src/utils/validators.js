import Joi from "@hapi/joi";

export const noteSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(30)
        .required(),
    content: Joi.string()
        .min(5)
        .required()
});

export const userLoginSchema = Joi.object({
    usernameOrEmail: Joi
        .string()
        .min(5)
        .required(),
    password: Joi.string()
        .min(8)
        .max(15)
        .required()
});

export const userRegisterSchema = Joi.object({
    username: Joi.string()
        .min(5)
        .required(),
    email: Joi.string().email({ tlds: { allow: false }}).required(),
    password: Joi.string()
        .min(8)
        .max(15)
        .required(),
    name: Joi.string()
});