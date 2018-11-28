const joi = require('joi')

/* eslint-disable lodash/prefer-lodash-method */

const session = joi.object().keys({
    id: joi.number().integer().min(1).required(),
    name: joi.string().trim(true).min(1).required(),
    date: joi.string().trim(true).isoDate().required()
})

module.exports = session
