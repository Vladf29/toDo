'use strict'

const express = require('express');
const router = express.Router();

const DB = require('../db/db');
const {
    validate,
    schemas
} = require('../helper/validator');

router.route('/add')
    .post(validate(schemas.add), async (req, res) => {
        try {
            const result = await DB.add(req.body);
            res.send(result);
        } catch (err) {
            res.status(400).send(err.message)
        }
    });

router.route('/all')
    .get(async (req, res) => {
        try {
            const result = await DB.getAll();
            res.json(result);
        } catch (err) {
            res.status(400).send(err.message);
        }
    });

router.route('/done')
    .put(validate(schemas.id), async (req, res) => {
        try {
            const result = await DB.done(req.body.id);
            res.send(result);
        } catch (err) {
            res.status(400).send(err.message);
        }
    })

router.route('/delete')
    .delete(validate(schemas.id), async (req, res) => {
        try {
            const result = await DB.delete(req.body.id);
            res.json(result);
        } catch (err) {
            res.status(400).send(err.message);
        }
    });

module.exports = router;