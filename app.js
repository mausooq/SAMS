const express = require("express");
const mysql= require("mysql");

const app=express();

app.get("/",(req,res)=>{
    res.send("<h1>helloe world<h1>")
});

app.listen(8080',(req,res                                                                                                                                           ) => {
    console.log("started");
})