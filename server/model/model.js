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
    fabrication_number : String,
    status : String,
    cart_available: String

})

const Userdb = mongoose.model('cart_lock', schema);

module.exports = Userdb;