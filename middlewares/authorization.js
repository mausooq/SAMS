const mysql = require("mysql2");
const jwt = require('jsonwebtoken')

const secert = 'mausooqSecert'
exports.jwtAuth = (req,res,next)=>{
 const auth = req.headers.authorization;
    if(auth){
        const token = auth.split(' ')[1];
        jwt.verify(token,secert,(err,res)=>{
            if(err){
                return res.render('login',{
                    message: "You are not logged in"
                })
            }
            next();
        })
    }
    else{
        res.json({meessage:'authorization Failed'})
    }
}