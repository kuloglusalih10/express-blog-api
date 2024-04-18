const express = require("express");
const Router = express.Router();
const commentController = require("../controllers/commentController")

const { addNewComment, deleteCommentById,getAllComment,getCommentById } = commentController

Router.get("/", getAllComment);
Router.post("/add-comment", addNewComment);
Router.post("/delete-comment", deleteCommentById);
Router.post("/get-comment", getCommentById);

module.exports = Router