const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });
 exports.displayProfile = (req,res) =>{
    const id = req.user.id;
    db.query('SELECT * from  where id =?',[id],(err,results)=>{
        if(err){
            console.log(err)
        }
        const profiles = results.map(profile => ({
            usn:profile.usn,
            name : profile.name,
            phone : profile.phone,
            email : profile.email,
            profilePic :profile.profilePic,
            Bio : profile.Bio
        }))
        res.json({profiles})
    })
}