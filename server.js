const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

// Mqtt
// const MqttHandler = require("./mqtt/mqtt_handler");

// var mqttClient = new MqttHandler();
// mqttClient.connect();
////////

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 3000

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// Routes
// app.post("/send_mqtt", function(req, res) {
//     mqttClient.sendMessage(req.body.message);
//     res.status(200).send("Message sent to mqtt");
//   });

// load routers
app.use('/', require('./server/routes/router'))



  
var server = app.listen(3000, function () {
 console.log(`Server is running on http://localhost:${PORT}`)});