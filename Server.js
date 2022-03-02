require('dotenv').config({ path: './config/.env' });
const express = require("express");
const mongoose = require("mongoose");
const Person = require("./models/User");

mongoose.connect(process.env.DB_URL);


const app = express();
app.use(express.json());



app.route("/add")
    .post((req,res) => {
        const user = new Person ({
            name : req.body.name,
            age : req.body.age
        })
        user.save((err) => {
            if(!err) {
                res.send("user added successfully")
            }
        });
        
    })

app.route("/")
    .get((req,res) => {
        Person.find((err,data) => {
            if(!err) {
                res.send(data)
            }
        })
    });

app.route("/edit/:id")
    .put((req,res) => {
        Person.updateOne({id :req.params.id},{...req.body},(err) => {
            if(!err) {
                res.send("Updated !")
            }
        })
    });

app.route("/delete/:id")
    .delete((req,res) => {
         Person.deleteOne({id :req.params.id},(err) => {
             if(!err) {
                 res.send("Deleted")
              }
         })
    });

app.listen(process.env.PORT,()=>{
    console.log("Connected on Port " + process.env.PORT)
})
