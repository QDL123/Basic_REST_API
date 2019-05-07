const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let courseSchema = new Schema({
    code: String,
    title: String,
    description: String,
    capacity: Number,
    startDate: Date,
    students: [String]
});
 
module.exports = mongoose.model('Course', courseSchema);
