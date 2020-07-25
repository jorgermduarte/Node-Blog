// var uuid = require('uuid')
var mongoose = require('mongoose')

var Schema = mongoose.Schema;


// var userSchema = require('./user.schema')



var User = require('./user.schema').Schema;
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
            var checkdata =  {
                active : true
            }
            
            var aggregator = [
                { "$match": { ...checkdata }},
                { "$sort" : {"_id" : -1} },
                { 
                    $lookup: {
                        from: "users",
                        localField: "_user",
                        foreignField: "_id",
                        as: "publisher"
                    },
            }
            ];

            Post
            .aggregate(aggregator)
            .then( response => {
                console.log(response);
                resolve(response)
            }).catch( err => {
                reject(err)
            })
        })
    },
    FindPostById : (id) => {
        return new Promise(async (resolve,reject) => {
        
            var checkdata =  {
                _id : mongoose.Types.ObjectId(id),
                active : true
            }

            var aggregator = [
                { "$match": { ...checkdata }},
                { 
                    $lookup: {
                        from: "users",
                        localField: "_user",
                        foreignField: "_id",
                        as: "publisher"
                    },
            }
            ];

            Post
            .aggregate(aggregator)
            .then( response => {
                console.log(response);
                resolve(response)
            }).catch( err => {
                reject(err)
            })
        })
    }
}

module.exports.Schema = Post;
module.exports.Methods = methods;
