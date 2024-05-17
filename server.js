const express= require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
const app= express();
const connect = require('./DataBase/db');
const port = 8000;

require('./route')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port);
});