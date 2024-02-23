const mysql = require('mysql2')

const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });
exports.displayProject = (req,res) =>{
    const id = req.user.id;
    db.query('SELECT image_path,title,date,location,description from project where id =?',[id],(err,results)=>{
        if(err){
            console.log(err)
        }
        const projects = results.map(project=>({
            image_path:project.image_path,
            title : project.title,
            date : project.date,
            location : project.location,
            description :project.description
        }))
        res.json({projects})
    })
}