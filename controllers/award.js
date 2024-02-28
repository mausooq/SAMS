const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });
exports.displayAward = (req,res) =>{
    const id = req.user.id;
    db.query('SELECT image_path,title,date,location,description from award where id =?',[id],(err,results)=>{
        if(err){
            console.log(err)
        }
        const awards = results.map(award => ({
            image_path:award.image_path,
            title : award.title,
            date : award.date,
            location : award.location,
            description :award.description
        }))
        res.json({awards})
    })
}