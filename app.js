const express = require("express");
const mysql= require("mysql2");
const dotenv = require("dotenv");
const app=express();
dotenv.config({
    path:'./.env'
});
const db = mysql.createConnection({
    host:process.env.database_host,
    user: process.env.database_user,
    password:process.env.database_password,
    database:process.env.database_database
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});
app.get("/",(req,res)=>{
    res.send("<h1>helloe world<h1>")
});

app.listen(5000,()=>{
    console.log("servr start on 8080")
})