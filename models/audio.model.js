const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Audio = new Schema({
    title : String,
    audio: Buffer, 
})

module.exports = mongoose.model('audio', Audio)