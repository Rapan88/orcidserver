const cors = require("cors");
const express = require("express");
// const axios = require("axios");
const fs = require("fs");
const https = require("https");
// const {addTeacher, getAllTeachers, getInfoByOrcid} = require("./controllers/dataController");
const app = express();
const db = require('./config/queries.js')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = 3000;

app.get('/users', db.getUsers)
app.get('/users/:orcid', db.getUserByOrcid)
app.post('/users', db.createUser)
app.delete('/users/:orcid', db.deleteUser)

httpsOptions = {
  key: fs.readFileSync("ssl/key.pem"), // путь к ключу
  cert: fs.readFileSync("ssl/cert.pem"), // путь к сертификату
};

https.createServer(httpsOptions, app).listen(port);
