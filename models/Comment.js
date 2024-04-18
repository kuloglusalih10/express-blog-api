const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: true,
        trim:true
    }, 
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    post: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    },
    date: {
        type:Date,
        default : Date.now
    }

})


module.exports = mongoose.model("Comment", CommentSchema);