const mongoose = require('mongoose');

const Schema = mongoose.Schema
const CustomerSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    ph: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    vehicleinfo: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Customer', CustomerSchema)