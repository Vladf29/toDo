'use strict'

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'pug');

app.use('/todo', require('./modules/routers/toDolist'));

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = 3000;
app.listen(PORT);