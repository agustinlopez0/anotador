const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Subjects = mongoose.model('Subject', new Schema({
    name: String,
    plataform: String, // Classroom | Comunidades
    linkPlataform: String,
    meet: String,
    linkMeet: String,
    horarios: String,
}))

module.exports = Subjects