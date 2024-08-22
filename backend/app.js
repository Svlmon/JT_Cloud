const express = require('express');
const {sequelize} = require("./models");
const app = express();
const PORT = process.env.PORT ||3000;

const AppService = require("./services/AppService");
const appService = new AppService(app, sequelize, PORT);

appService.init_app();