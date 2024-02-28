const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
})

exports.displayInternship = (req,res) =>{
    const id = req.user.id;
    db.query("SELECT  image_path,title,date,location,description  FROM INTERNSHIP WHERE ID =?",[id],(err,results)=>{
        if(err){
            console.log(err)
        }
        const internships = results.map(internship => ({
            image_path : internship.image_path,
            title : internship.title,
            date : internship.date,
            location : internship.location,
            description :internship.description
        }))
        res.json({internships})
    })
}