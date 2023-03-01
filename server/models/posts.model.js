const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    name : String,
    text: String, 
})

module.exports = mongoose.model('post', Post)