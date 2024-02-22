const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

JWT_SECERT='nnjkhgfchj9gfhxdcghjfxcguihxfcvoiufcbhijit65e46drtfyyuihi'
const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
});



exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.userSave) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.userSave, JWT_SECERT);
        
            // The decoded variable is accessible here
            db.query('SELECT * FROM STUDENT WHERE id = ?', [decoded.id], async (err, results) => {
                // console.log(results[0]);
                if (err) {
                    res.status(500).json({ message: 'Database error' });
                } 
                    else {
                        if (results.length > 0) {
                            // Attach user information to the request object
                            req.user = results[0];
                            // console.log(req.user)
                            next();
                    // console.log(results);
                }
            }
         });
        } catch (err) {
            res.status(403).json({ message: 'Invalid token' });
        }
    } else {
        return res.render('login',{
           message:"login first"
        });
    }
};
