const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Events = mongoose.model('Event', new Schema({
    subject_id: String,
    title: String,
    desc: String,
    date: String,
    priority: {type: Boolean, default: false}
}))

module.exports = Events