const express = require('express');
const Router = express.Router();
const accounController = require('../controllers/accountController')

const { postLogin , postRegister} = accounController

Router.post("/login", postLogin);
Router.post("/register", postRegister);

module.exports = Router