
let mongoose = require('mongoose')
const configs = require('../configurations/index').mongodb
let mongo

Initialize = async () => {
    try{
        mongo = await mongoose.connect(configs.url,configs.options)
        console.log(`Successfully connected to the mongodb database`)
    }catch(err){
        throw err
    }
}

Db = () => mongo

module.exports = { Initialize }