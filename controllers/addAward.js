const mysql = require("mysql2");


const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });

 exports.uploadAward= async(req,res)=>{
    const{ title,date,location,description} = req.body;
    const imagePath = req.file ? req.file.path : null;
  
      db.query('INSERT INTO Award SET ?;',{
          id:req.user.id,
          aid:(Date.now())/5,
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
          res.render('addAwards',{
            msg: "Your Award has been added!",
          })
        }
      }
      );
    }
  