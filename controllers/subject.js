const mysql = require('mysql2')
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
 });
 exports.getSubjectsBySemester =  (req,res) =>{
    const semester = req.params.semester;
    // console.log(semester);
    const id = req.user.id;
   db.query(
        `SELECT * FROM MARKS WHERE semId IN (SELECT semId FROM Semester WHERE ID = ? AND semesterName = ?)`,
        [id,semester],
        (error, results) => {
            if (error) {
                console.error('Error fetching subjects:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json(results);
            }
        }
    );
}