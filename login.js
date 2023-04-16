const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
require('dotenv').config();


app.use("/public",express.static("public"))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Otolorin2437',
    database: 'auth_db'
});

// connect to database

connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database!")
});


app.get("/", function(req,res){
    res.sendFile(__dirname + "/views/login.html");
})

app.post("/", encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password], function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

app.post("/signup", encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("INSERT INTO loginuser (user_name, user_pass) VALUES (?, ?)", [username, password], function(error,results,fields){
        if (error) throw error;
        res.redirect("/login");
    })
})

//when login is successful

app.get("/welcome", function(req,res){
    res.sendFile(__dirname + "/views/welcome.html")
})    

app.get("/products", function(req,res){
    res.sendFile(__dirname + "/views/products.html")
})  

app.get("/login", function(req,res){
    res.sendFile(__dirname + "/views/login.html")
})  


app.get("/signup", function(req,res){
    res.sendFile(__dirname + "/views/signup.html")
})  


//set app port
app.listen(1000);
  