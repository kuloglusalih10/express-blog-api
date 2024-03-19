const express = require("express");
const Router = express.Router();
const categoryController = require("../controllers/categoryController")

const { addCategory, getAllCategory } = categoryController

Router.get("/", getAllCategory);
Router.post("/add-category", addCategory);

module.exports = Router