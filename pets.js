const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema({
    Name: String,
    Type: String,
    Breed: String,
    Age: Number,
})

module.exports = mongoose.model('pets', petsSchema);