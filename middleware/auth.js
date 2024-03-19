const jwt = require("jsonwebtoken");

const auth =  (req,res,next) => {

    try {

        const token = req.headers["authorization"];

        if(!token){
            return res.json({
                res:false,
                status:404,
                messge : "Token bulunamadı"
            })
        }


        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {

                return res.json({
                    res: false,
                    status: 401,
                    message: "Geçersiz token bilgisi"
                });
            }
        
            req.user = decoded;
            next();
        });

        }
        catch (error){
            res.json({
                res: false,
                status: 500,
                message : error.message
            })
        }
}

module.exports = auth