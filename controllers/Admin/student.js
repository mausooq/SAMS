const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });
exports.getStudent = (req,res) =>{
    db.query('SELECT id,usn,name,email from student',(err,results)=>{
        if(err){
            console.log(err)
        }
        res.json(results);
    })
}