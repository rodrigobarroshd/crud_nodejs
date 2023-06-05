const axios = require('axios');
// const { MqttClient } = require('mqtt');
// const MqttHandler = require('../../mqtt/mqtt_handler');
// Mqtt
const MqttHandler = require("../../mqtt/mqtt_handler");

var mqttClient = new MqttHandler();
mqttClient.connect();

exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function (response) {
            res.render('index', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function (userdata) {
            res.render("update_user", { user: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}

exports.send_to_car = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
    .then(function (userdata) {
        res.render("send_to_car", { user: userdata.data })
            mqttClient.sendMessage(req.query.id)
        })
        .catch(err => {
            res.send(err);
        })
}
