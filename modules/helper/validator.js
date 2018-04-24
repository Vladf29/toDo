'use strict'

const Joi = require('joi');

module.exports = {
    validate: (schema) => {
        return (req, res, next) => {
            if (!req.body) return res.status(400).send('Error');

            const result = Joi.validate(req.body, schema);
            if (result.error) return res.status(400).send(result.error.message);
            next();
        }
    },
    schemas: {
        task: Joi.string().min(1).required(),
        done: Joi.boolean().required(),
    }
}