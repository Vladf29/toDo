'use strict'

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/toDoList', require('./modules/routers/toDolist'));

const PORT = 3000;
app.listen(PORT);