// Import required modules
const mysql = require("mysql2");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });

exports.login = async (req,res) => {
    // console.log(req.body);
    const {email,password} = req.body;
    db.query("SELECT * FROM ADMIN WHERE EMAIL = ?",[email], async (err,results) => {
        // console.log(results);
        if(err) throw err;
        if(results.length > 0){
                const dpassword = results[0].password;
                    // console.log(dpassword);
                if(password === dpassword){
                const id = results[0].admin_id;
                const token = jwt.sign({id}, process.env.JWT_SECERT
                    ,{ expiresIn:  '90d'})
                // console.log(token)
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('adminSave', token, cookieOptions);
                res.status(200).redirect("/Admin/Dashboard");
                }
                else{
                    return res.render('admin/adminLogin',{
                        message:"Invalid Email or Password"
                })
        }   
    }
        else{
            return res.render('admin/adminLogin',{
                message:"Admin Email not found"
            });
        }
        
    });
}

exports.logout = (req, res) => {
    res.cookie('adminSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect("/");
}