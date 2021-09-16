const mongoose = require('mongoose');

const user = mongoose.Schema({
    nom:{type: 'string', require: true, maxLength:20},
    email:{type: 'string', require: true, unique: true},
    password: {type: 'string', require: true, minLength: 8},
    telephone: {type: 'number', require: true,null: true}
})

module.exports = mongoose.model('Users',user)