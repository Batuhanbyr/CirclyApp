const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
require('dotenv').config();

const app = express()
const port = 3000;
const cors = require("cors")

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cwt = require("jsonwebtoken");

const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_USER = process.env.MONGO_DB_USER;

mongoose.connect(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.wcsjbaj.mongodb.net/`).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log("Error connecting to MongoDB")
})



app.listen(port , () => {
    console.log("Server is running on 3000")
})