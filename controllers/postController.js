const Post = require("../models/Post");
const addPostValidation = require("../validations/addPostValidation");


const addNewPost = async (req, res) => {


    try {

        const post = req.body;
        const {error} = addPostValidation.validate(post);

        if(error){
            return res.json({
                res : false, 
                status : 400,
                message : error.details[0].message
            });
        }

        const newPost = new Post(post);

        await newPost.save();

        return res.json({
            res :true,
            status : 202,
            data : newPost
        })

    } catch (error) {

        return res.json({

            res :false,
            status: 500 ,
            message: error.message
        })   
    }
    

    
}


const getAllPost = async (req,res)=>{

    try {
        
        const posts = await Post.find({}).populate({path : 'author'});

        return res.json({
            res :true,
            status :200,
            data : posts
        })
        
    } catch (error) {

        return res.json({
            res : false,
            status : 500,
            message : error.message
        })
    }
}


module.exports = {addNewPost ,getAllPost}