const Comment = require("../models/Comment");
const addCommentValidation  = require("../validations/addCommentValidation");


const addNewComment = async (req, res) => {


    try {

        const comment = req.body;
        const {error} = addCommentValidation.validate(comment);

        if(error){
            return res.json({
                res : false, 
                status : 400,
                message : error.details[0].message
            });
        }

        const newComment = new Comment(comment);

        await newComment.save();

        return res.json({
            res :true,
            status : 202,
            data : newComment
        })

    } catch (error) {

        return res.json({

            res :false,
            status: 500 ,
            message: error.message
        })   
    }
    

    
}

const getAllComment = async (req,res)=>{

    try {
        
        const comments = await Comment.find({}).populate({path : 'author'}).populate({path : 'post'});

        return res.json({
            res :true,
            status :200,
            data : comments
        })
        
    } catch (error) {

        return res.json({
            res : false,
            status : 500,
            message : error.message
        })
    }
}

const getCommentById = async (req, res) => {
    try {

        const {id} = req.body;

        const comment = await Comment.findById(id).populate({path : 'author'}).populate({path : 'post'});

        if(!comment){

            return res.json({
                res :false,
                status: 500,
                message : "Yorum Kaydı Bulunamadı"
            });
        }

        return res.json({
            res:true,
            status : 200,
            data : comment
        });


        
    } catch (error) {

        return res.json({
            res :false, 
            status : 500,
            message : error.message
        })
    }
}

const deleteCommentById = async (req, res)=>{
    try {
        
        const {id} = req.body;

        const comment = await  Comment.findByIdAndDelete(id);

        if(!comment){
            return res.json({
                res:false,
                status : 404,
                message : "Yorum Kaydı Bulunamadı"
            })
        }

        return res.json({
            res : true,
            status : 202,
            data : comment
        })


    } catch (error) {
        return res.json({
            res: false,
            status : 500,
            message: error.message
        })
    }
}


module.exports = {deleteCommentById , getCommentById, getAllComment, addNewComment}