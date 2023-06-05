const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

// // Mqtt
// const MqttHandler = require("../../mqtt/mqtt_handler");

// var mqttClient = new MqttHandler();
// mqttClient.connect();

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

/**
 *  @description for update user
 *  @method GET /send_to_car
 */
route.get('/send_to_car', services.send_to_car)

// route.post("/send_to_car", function(req, res) {
//     mqttClient.sendMessage("req.body.message");
//     res.status(200).send("Message sent to mqtt");
//   });

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route