const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const loginValidation = require("../validations/loginValidation");
const registerValidation = require("../validations/registerValidation")


const postRegister = async (req, res) => {
    try {


        const { name, email } = req.body;
        const password = await bcrypt.hash(req.body.password, 12);

        const {error} = registerValidation.validate({name, email, password});

        if(error){
            return res.json({
                res : false, 
                status : 400,
                message : error.details[0].message
            })
        }

        const user = await User.findOne({ email });
        if (user) {

            return res.json({
                res:false,
                status: 400,
                message: 'Bu email zaten kullanımda',
            });

        } else {

            const newUser = new User({ name, email, password });

            await newUser.save();

            return res.json({
                res : true,
                status: 200,
                message: 'Kullanıcı kaydı başarılı '
            });
        }
    } catch (err) {
        
        return res.json({
            res: false,
            status: 500,
            message: err.message,
        });
    }
}
 

 const postLogin = async (req, res) => {

    try {

        const {email , password} = req.body;

        const {error} = loginValidation.validate({email,password});

        if(error){
            return res.json({
                res: false,
                status: 400,
                message: error.details[0].message
            })
        }

        const user = await User.findOne({email});

        if(!user){
            res.json({
                res : false,
                status : 404,
                message : "Kullanıcı kaydı bulanamadı"
            })
        }
        else {

            const match = await  bcrypt.compare(password, user.password);

            if(!match){
                res.json({
                    res: false,
                    status: 400,
                    message : "Hatalı şifre"
                });
            }
            else {
                const payload = Object.assign({}, user);

                const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn : '1h'});

                res.json({
                    res: true,
                    status : 201,
                    message: "Giriş işlemi başarılı",
                    token: token
                })
            }
        }

        


    }
    catch (error){
        res.json({
            res: false,
            status : 500,
            message : error.message
        })
    }

    

}

module.exports = { postLogin , postRegister }