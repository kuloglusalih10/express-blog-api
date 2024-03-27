const express = require("express");
const Category = require("../models/Category");




const addCategory = async (req ,res) => {


    try {
        
        const { name } = req.body;

        const slug = name.toLowerCase().split(" ").join("-");

        if(!name){

            return res.json({
                res:false,
                status: 404,
                message: "Hatalı bir istekte bulundunuz !"
            })
        }

        const newCategory = new Category({name , slug});

        await newCategory.save();

        return res.json({
            res: true,
            status: 201,
            data : newCategory

        })

        
    } catch (error) {

        return res.json({
            res:false,
            status: 500,
            message: error.message
        })

    }
}


const getAllCategory = async (req, res) => {
    
    try {

        const categories = await Category.find({});

        return res.json({
            res : true, 
            status: 200,
            data : categories

        })
        
    } catch (error) {

        return res.json({
            res: false,
            status : 500,
            message : error.message
        })
    }
}

module.exports = {addCategory , getAllCategory}