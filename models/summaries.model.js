const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Summary = new Schema({
    title : String,
    summary: String, 
})

module.exports = mongoose.model('summary', Summary)