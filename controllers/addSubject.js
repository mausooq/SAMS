const mysql = require("mysql2");


const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });

 exports.uploadSubject = async(req,res)=>{
   const id =req.user.id;
   const{semester,subjectName,maxMarks,subjectMarks,subjectGrade,} = req.body;
   db.query('SELECT * FROM SEMESTER WHERE ID = ? AND semesterName = ?',[id,semester],async (err,result)=>{
      if(err){
         console.log(err);
      }
      
      if(result.length > 0){
      const semId = result[0].ID;
      await db.query('INSERT INTO SUBJECTS VALUES SET ?',{
         id:id,
         semId:semId,
         subId : Math.floor(Math.random() * 90000) + 10000,
         subName : subjectName,
         maxMark : maxMarks,
         subMark : subjectMarks,
         subjectGrade :  subjectGrade
      },
      (error)=>{
         if(error){
            console.log(err);
         }
         else{
            res.render('marks',{
               message:"marks added  successfully"
            })
         }

      })
      }
   })
 }
  