const express = require("express");
const Router = express.Router();

const {addNewPost, getAllPost, getPostById, deletePostById} = require("../controllers/postController");

Router.get("/", getAllPost);
Router.post("/new-post", addNewPost);
Router.post("/get-post", getPostById);
Router.post("/delete-post", deletePostById);

module.exports = Router;