const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const nodemailer = require("nodemailer")

const app = express()
const port = 3000;
const cors = require("cors")

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://bbayir686:Batuhan.21@cluster0.9d8iqla.mongodb.net/").then(() => {
    console.log("Connected to MongDB")
}).catch((error) => {
    console.log("Error connecting to MongoDB")
})

app.listen(port , () => {
    console.log("Server is running on 3000")
})