// Import required modules
const mysql = require("mysql2");
const bcrypt = require('bcryptjs');
const { reset } = require("nodemon");
const jwt = require('jsonwebtoken')

const secert = 'mausooqSecert'
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });
 // Handle signup request
exports.signup = async (req,res) => {
    // console.log(req.body);

    // const usn = req.body.usn;
    // const name = req.body.name;
    // const phone = req.body.phone;
    // const email = req.body.email;
    // const password = req.body.password;
    // const cpassword = req.body.cpassword;

  // Destructure the request body
  const {usn,name,phone,email,password,cpassword} = req.body;

      // Check if the email already exists in the database
    db.query('SELECT email FROM sams.student WHERE email = ?',[email],async (err,result) => {
        if(err){
            console.log(err);
        }
        if(result.length > 0){
                  // If the email already exists, render the signup page with an error message
            return res.render('signup',{
                message:"Email already exists"
            });
        }
              // If the passwords don't match, render the signup page with an error message
        else if(password !== cpassword){
            return res.render('signup',{
                message:'Password does not match'
            });
        }
              // If everything is fine, hash the password and insert the new user into the database
        let hasedPassword = await bcrypt.hash(password, 8);
        // console.log(hasedPassword);
4
        db.query("INSERT INTO STUDENT SET ?;",{
            usn:usn,
            name:name,
            phone:phone,
            email:email,
            password:hasedPassword
        },
        (error) =>{
            if(error){
                console.log(error);
            }
            else{
                        res.render('signup',{
                        msg:'SignUp sucessfully'
                });
            }
        }
        );
    }); 
};

exports.login = async (req,res) => {
    // console.log(req.body);
    const {email,password} = req.body;
    db.query("SELECT * FROM STUDENT WHERE EMAIL = ?",[email], async (err,results) => {
        // console.log(results);
        if(err) throw err;
        if(results.length > 0){
                const dpassword = results[0].PASSWORD;
                    // console.log(dpassword);
                const passwordMatch = await bcrypt.compare(password,dpassword);
                // console.log(passwordMatch)
                if(passwordMatch){
                const token = jwt.sign({email,password},secert,{ expiresIn: '1h' })
                res.header('Authorization',`Bearer ${token}`)
                res.redirect('/dashboard');
                }
                else{
                    return res.render('login',{
                        message:"Invalid Email or Password"
                })
        }   
    }
        else{
            return res.render('login',{
                message:"email not found"
            });
        }
        
    });
}

exports.logout = (req,res) =>{
    res.render('index')
}
