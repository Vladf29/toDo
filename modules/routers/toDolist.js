'use strict'

const express = require('express');
const router = express.Router();

const DB = require('../db/db');
const {
    validate,
    schemas
} = require('../helper/validator');

router.route('/add')
    .post(validate(schemas), async (req, res) => {
        try {
            const result = await DB.add(req.body);
            res.send(result);
        } catch (err) {
            res.status(400).send('Error')
        }
    });

router.route('/getAll')
    .get(async (req, res) => {
        try {
            const result = await DB.getAll();
            res.json(result);
        } catch (err) {
            res.status(400).send('Error');
        }
    });

router.route('/done')

router.route('/delete')
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await DB.delete(req.body);
            res.json(result);
        } catch (err) {
            res.status(400).send();
        }
    });

module.exports = router;