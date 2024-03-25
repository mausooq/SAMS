// Importing required modules
const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Configuring the dotenv module
dotenv.config({ path: './.env' });

// Creating an Express application
const app = express();

// Setting up the database connection
const db = mysql.createConnection({
   host: process.env.database_host,
   user: process.env.database_user,
   password: process.env.database_password,
   database: process.env.database
});
// Event handler for database connection error
db.connect((err) => {
   if (err) {
       console.error('Error connecting to MySQL database:', err);
   } else {
       console.log('Connected to MySQL database');
   }
});



// Setting the public directory
const publicDirectory =path.join(__dirname,'./public');
app.use(express.json());
app.use(express.static(publicDirectory));
app.use(cookieParser());
app.use(cors());
app.use('/images', express.static('images'));
app.use('/assets', express.static('assets'));
// Handling requests from the client-side JavaScript code
// Setting the view engine to handlebars
app.set('view engine', 'hbs');
//define router
app.use('/',require('./routes/pages.js'))
app.use('/marks',require('./routes/semPages.js'))
app.use('/auth',require('./routes/auth.js'))

app.use('/adminAuth',require('./routes/adminAuth.js'))
app.use('/Admin',require('./routes/adminPages.js') )
// Starting the server
app.listen(5000, () => {
   console.log("servr start on 5000");
});
