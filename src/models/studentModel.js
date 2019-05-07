const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String
});

module.exports = mongoose.model('Student', studentSchema);
