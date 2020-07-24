// var uuid = require('uuid')
var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    _user : { type: Schema.Types.ObjectId, ref: 'User' },
    title : { type: String, required : true},
    subtitle : { type: String },
    image : { type : String },
    tags : { type : String },
    content : { type : String },
    date_create  : { type: Date, default: Date.now },
    date_update :  { type: Date },
    active : { type: Boolean, default: true }
});

let Post = mongoose.model("Post",PostSchema);


let methods = {
    GetAllPosts : () => {
        return new Promise((resolve,reject) => {
            Post.find({
                active : true
            }).exec((err,res) => {
                if(err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },
    FindPostById : (id) => {
        return new Promise((resolve,reject) => {
            Post.findOne({
                _id : id,
                active : true
            }).populate('User').exec((err,res) => {
                if(err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    }
}

module.exports.Schema = Post;
module.exports.Methods = methods;
