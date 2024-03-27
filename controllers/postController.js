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

const getPostById = async (req, res) => {
    try {

        const {id} = req.body;

        const post = await Post.findById(id).populate({path : 'author'});

        if(!post){

            return res.json({
                res :false,
                status: 500,
                message : "Kayıt Bulunamadı"
            });
        }

        return res.json({
            res:true,
            status : 200,
            data : post
        });


        
    } catch (error) {

        return res.json({
            res :false, 
            status : 500,
            message : error.message
        })
    }
}

const deletePostById = async (req, res)=>{
    try {
        
        const {id} = req.body;

        const post = await  Post.findByIdAndDelete(id);

        if(!post){
            return res.json({
                res:false,
                status : 404,
                message : "Post Bulunamadı"
            })
        }

        return res.json({
            res : true,
            status : 202,
            data : post
        })


    } catch (error) {
        return res.json({
            res: false,
            status : 500,
            message: error.message
        })
    }
}


module.exports = {addNewPost ,getAllPost , getPostById , deletePostById}