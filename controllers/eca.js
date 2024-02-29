const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });
exports.displayEca = (req,res) =>{
    const id = req.user.id;
    db.query('SELECT image_path,title,date,location,description from eca where id =?',[id],(err,results)=>{
        if(err){
            console.log(err)
        }
        const ecas = results.map(eca => ({
            image_path:eca.image_path,
            title : eca.title,
            date : eca.date,
            location : eca.location,
            description :eca.description
        }))
        res.json({ecas})
    })
}