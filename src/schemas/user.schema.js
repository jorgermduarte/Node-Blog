// var uuid = require('uuid')
var mongoose = require('mongoose')

var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email : { type: String , required : true},
    avatar : { type: String },
    password : { type: String , required : true},
    date_create  : { type: Date, default: Date.now },
    date_update : { type: Date, default: Date.now },
    settings : {
        administrator : { type: Boolean, default: false }
    },
    enabled : { type: Boolean, default: true },
    active : { type: Boolean, default: true }
});

let User = mongoose.model("User",UserSchema);

module.exports.Schema = User;