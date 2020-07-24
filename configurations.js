module.exports = {
    port : process.env.PORT || 3000,
    cors : {
        "origin": "*",
        "methods": "GET,PUT,POST,DELETE",
        "allowedHeaders" : [ 'Content-Type','application/json','Authorization'],
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    },
    mongodb : {
        url : "mongodb://localhost:27017/blog",
        options :{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    }
}