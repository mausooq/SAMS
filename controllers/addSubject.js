const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
});

exports.uploadSubject = (req, res) => {
    const id = req.user.id;
    const { semester, subjectName, maxMarks, subjectMarks, subjectGrade } = req.body;

    db.query('SELECT * FROM SEMESTER WHERE ID = ? AND semesterName = ?', [id, semester], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (result.length > 0) {
            const semId = result[0].semId;
            const subId = Math.floor(Math.random() * 90000) + 10000;

            db.query('INSERT INTO MARKS SET ?', {
                id: id,
                semId: semId,
                subId: subId,
                subName: subjectName,
                maxMark: maxMarks,
                subMark: subjectMarks,
                grade: subjectGrade
            },
                (error) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.json({ success: true, message: 'Marks added' });
                    }
                });
        } else {
            const newsemId = Math.floor(Math.random() * 9000) + 1000;

            db.query('INSERT INTO SEMESTER SET ?', {
                id: id,
                semId: newsemId,
                semesterName: semester
            },
                (error) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }

                    const subId = Math.floor(Math.random() * 90000) + 10000;

                    db.query('INSERT INTO MARKS SET ?', {
                        id: id,
                        semId: newsemId,
                        subId: subId,
                        subName: subjectName,
                        maxMark: maxMarks,
                        subMark: subjectMarks,
                        grade: subjectGrade
                    },
                        (error) => {
                            if (error) {
                                console.log(error);
                                res.status(500).json({ error: 'Internal Server Error' });
                            } else {
                                
                                res.json({ success: true, message: 'Marks added' });
                            }
                        });
                });
        }
    });
};
