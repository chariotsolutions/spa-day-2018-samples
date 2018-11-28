const joi = require('joi')

/* eslint-disable lodash/prefer-lodash-method */

const registration = joi.object().keys({
    name: joi.string().trim(true).min(1).required(),
    email: joi.string().trim(true).email().required(),
    treatment: joi.string().trim(true).min(1).required()
})

module.exports = registration
