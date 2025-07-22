"use strict";
import Joi from "joi";

export const createValidation = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .messages({
            "string.pattern.base": "El título solo puede contener letras, números y espacios.",
            "string.min": "El título debe tener al menos 3 caracteres.",
            "string.max": "El título no puede exceder los 100 caracteres.",
            "any.required": "El título es obligatorio."
        }),

    descripcion: Joi.string()
        .min(3)
        .max(500)
        .required()
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .messages({
            "string.pattern.base": "La descripción solo puede contener letras, números y espacios.",
            "string.min": "La descripción debe tener al menos 3 caracteres.",
            "string.max": "La descripción no puede exceder los 500 caracteres.",
            "any.required": "La descripción es obligatoria."
        })
});