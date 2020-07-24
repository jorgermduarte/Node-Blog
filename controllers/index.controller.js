var render = require('./../framework/render')

var Post = require('./../schemas/post.schema')

module.exports = {

    MainPage : async (req,res) => {
        var allPosts = await Post.Methods.GetAllPosts()
        render({ req : req,  res : res, view : 'index.ejs' , data : allPosts })
    },
    ViewPost : async (req,res) => {

        var post = await Post.Methods.FindPostById(req.params.id);

        render({ req : req,  res : res, view : 'post.ejs', data : post })
    }


}