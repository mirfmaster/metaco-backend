const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
// const config = require('../config/app');
const extensions = require('./supports/Extensions');
// const logger = require('./supports/Logger');
const app = express();
const services = require('../app/services/');
const bodyParser = require("body-parser");

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb' }));

extensions.map((extension) => app.use(extension));

app.services = services;
// app.controllers = require('../app/controllers/');
app.locals.instance = app;
// app.locals.config = config;
// app.logger = logger;

module.exports = app;