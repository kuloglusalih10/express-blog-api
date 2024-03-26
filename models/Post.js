const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim:true
    }, 

    subTitle : {
        type : String,
        required :true,
        trim : true
    }, 

    description : {
        type: String,
        require :true, 
        trim: true
    },

    date: {
        type:Date,
        default : Date.now
    },

    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

})


module.exports = mongoose.model("Post", PostSchema);