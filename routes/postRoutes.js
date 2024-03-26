const express = require("express");
const Router = express.Router();

const {addNewPost, getAllPost} = require("../controllers/postController")

Router.post("/new-post", addNewPost);
Router.get("/all-post", getAllPost);

module.exports = Router;