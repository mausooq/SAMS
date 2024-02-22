const mysql = require("mysql2");


const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });

 exports.uploadProject = async(req,res)=>{
    const{ title,date,location,description} = req.body;
    const imagePath = req.file ? req.file.path : null;
  
      db.query('INSERT INTO PROJECT SET ?;',{
          id:req.user.id,
          pid:(Date.now())/2,
          image_path:imagePath, 
          title:title,
          date:date,
          location:location,
          description:description
      },
      (err) =>{
        if(err){
          console.log(err);
        }
        else{
          res.render('addProject',{
            msg: "Your project has been added!",
          })
        }
      }
      );
    }
  