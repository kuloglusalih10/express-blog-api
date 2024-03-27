const express = require("express");
const Router = express.Router();

const {addNewPost, getAllPost} = require("../controllers/postController")

Router.get("/", getAllPost);
Router.post("/new-post", addNewPost);

module.exports = Router;