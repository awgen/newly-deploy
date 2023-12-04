const express = require('express')
const mysql = require('mysql')
const cors = require('cors')


const app = express();
const PORT = 3306
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    user: "uofvntbm00d0ulsi",
    host: "b79spce0wvcyy1tdfmxh-mysql.services.clever-cloud.com",
    password: "CEybMUFVgoF5xFEnVf6m",
    database: "b79spce0wvcyy1tdfmxh"
})

// posting register
app.post("/register", (req, res) => { 
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    db.query(
    "INSERT INTO register (username, email, password) VALUES (? ,?, ?)", 
    [username, email, password],
     (err, result) => {
        if(err){
            console.error("Error in /register:", err);
            return res.status(500).json({ error: "Registration failed" });
        }
    })
   

    return res.json("Registration successful");
})

app.get("/all", (req, res) => {
    db.query("SELECT * FROM register ", (err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

// posting logins
app.post('/login', (req, res) => {  
    const username = req.body.username
    const password = req.body.password
    db.query(
    "SELECT * FROM  register WHERE username = ? AND password = ?", 
    [username, password],
     (err, result) => {
        
        if(err) {
            console.error("Error during login:", err);
            return res.json("Login Failed");
        }

        if (result.length > 0) {
            // Login successful
            console.log("Login successful");
            // You may want to send a response indicating success
            res.json("Login Successful");
        } else {
            // Login failed
            console.log("Login failed");
            res.json("Login Failed");
        }

    })
})


app.listen(PORT)