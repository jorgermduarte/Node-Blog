var render = require('./../framework/render')

module.exports = {

    MainPage : (req,res) => {
        render({ req : req,  res : res, view : 'index.ejs' })
    },
    ViewPost : (req,res) => {
        render({ req : req,  res : res, view : 'post.ejs' })
    }
}