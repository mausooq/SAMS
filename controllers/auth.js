const mysql = require("mysql2");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database_database
 });
exports.signup = (req,res) => {
    // console.log(req.body);
    // const usn = req.body.usn;
    // const name = req.body.name;
    // const phone = req.body.phone;
    // const email = req.body.email;
    // const password = req.body.password;
    // const cpassword = req.body.cpassword;
    const {usn,name,phone,email,password,cpassword} = req.body;
    
    db.query('SELECT email FROM sams WHERE email = ?',[email],async (err,res) => {
        if(err){
            console.log(err);
        }
        if(req.length > 0){
            return res.render('signup',{
                message:"Email already exists"
            })
        }
        else if(password !== cpassword){
            return res.render('signup',{
                message:'Password does not match'
            })
        }
        let hasedPassword = await bcrypt.hash(password, 8);
        console.log(hasedPassword);
    });
   
};

