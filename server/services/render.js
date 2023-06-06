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
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id , id_topic: req.query.id_topic}})
    .then(function (userdata) {
        res.render("send_to_car", { user: userdata.data })
        console.log(userdata.data); 

        message = {
            "command":"unlock",
            "id_user": userdata.data._id,
            "topic_cart": userdata.data.id_topic
        };

        console.log(userdata.data.id_topic, JSON.stringify(message, null, 2));

        // Send MQTT
        mqttClient.sendMessage(userdata.data.id_topic, JSON.stringify(message, null, 2))

        // {"command":"unlock","id_user":userdata.data._id, "id_topic": userdata.data.id_topic}
        
        // Exibindo os valores
        // console.log('ID:', userdata.data._id);
        // console.log('Topic ID:', userdata.data.id_topic);
        // console.log('MAC Address:', userdata.data.mac_address);
        // console.log('Fabrication Number:', userdata.data.fabrication_number);
        // console.log('Cart Available:', userdata.data.cart_available);
        
        
        })
        .catch(err => {
            res.send(err);
        })
}
