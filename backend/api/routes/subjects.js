const express = require('express')
const Subjects = require('../models/Subjects')

const router = express.Router()

router.get('/', (req, res) => {
    Subjects.find()
        .exec()
        .then(x => res.status(200).send(x))
})

router.get('/:id', (req, res) => {
    Subjects.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})

router.post('/', (req, res) => {
    Subjects.create(req.body).then(x => res.status(201).send(x))
})

router.put('/:id', (req, res) => {
    Subjects.findByIdAndUpdate(req.params.id, req.body)
        .then( () => res.sendStatus(204) )
})

router.delete('/:id', (req, res) => {
    Subjects.findByIdAndDelete(req.params.id)
        .then( () => res.sendStatus(204) )
})

module.exports = router

