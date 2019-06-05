const express = require("express");
const router = express.Router();
const Joi = require('@hapi/joi');

router.post('/', (req, res, next) => {
    const data = req.body;
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
        birthday: Joi.date().max('1-1-2004').iso().required()
    });
    Joi.validate(data, schema, (err, value) => {
        const id = Math.ceil(Math.random() * 9999999);

        if (err) {
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
            res.json({
                status: 'success',
                message: 'User created successfully',
                data: Object.assign({ id }, value)
            });
        }

    });

});

module.exports = router