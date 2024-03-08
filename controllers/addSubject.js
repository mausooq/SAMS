const mysql = require("mysql2");


const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });

 exports.uploadSubject = async(req,res)=>{
   const{semester,subjectName,maxMarks,subjectMarks,subjectGrade,} = req.body;
   db.query('INSERT INTO SEMESTER SET ? ; ')
 }
  