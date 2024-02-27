const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });
 exports.displayAchievements = (req,res) =>{
    const id = req.user.id;
    db.query('SELECT image_path,title,date,location,description from achievement where id =?',[id],(err,results)=>{
        if(err){
            console.log(err)
        }
        const achievements = results.map(achievement => ({
            image_path:achievement.image_path,
            title : achievement.title,
            date : achievement.date,
            location : achievement.location,
            description :achievement.description
        }))
        res.json({achievements})
    })
}