const express = require('express')
const Events = require('../models/Events')

const router = express.Router()

router.get('/', (req, res) => {
    Events.find()
        .exec()
        .then(x => res.status(200).send(x))
})

router.get('/:id', (req, res) => {
    Events.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})

router.post('/', (req, res) => {
    Events.create(req.body).then(x => res.status(201).send(x))
})

router.put('/:id', (req, res) => {
    Events.findByIdAndUpdate(req.params.id, req.body)
        .then( () => res.sendStatus(204) )
})

router.delete('/:id', (req, res) => {
    Events.findByIdAndDelete(req.params.id)
        .then( () => res.sendStatus(204) )
})

module.exports = router

