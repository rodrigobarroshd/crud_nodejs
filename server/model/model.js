const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id_topic : {
        type : String,
        required: true
    },
    mac_address : {
        type: String,
        required: true,
        unique: true
    },
    ordem_fabricacao : String,
    status : String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;