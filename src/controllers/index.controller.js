const Feed = require('feed').Feed
const configs = require('../configurations/index')

let render = require('./../framework/render')
let Post = require('./../schemas/post.schema')
const { rss } = require('./../configurations')


module.exports = {
    MainPage : async (req,res) => {
        var allPosts = await Post.Methods.GetAllPosts()
        render({ req : req,  res : res, view : 'index.ejs' , data : allPosts })
    },
    ViewPost : async (req,res) => {

        var post = await Post.Methods.FindPostById(req.params.id);

        render({ req : req,  res : res, view : 'post.ejs', data : post })
    },
    RssFeed : async (req,res) => {

        var feed = new Feed({
            title: configs.rss.title,
            description: configs.rss.description,
            id: `https://${req.hostname}/`,
            link: `https://${req.hostname}/`,
            language: configs.rss.language, 
            image: configs.rss.image,
            favicon: configs.rss.favicon,
            copyright: `All rights reserved ${new Date().getFullYear()}, ${configs.rss.author.name}`,
            updated: new Date(), 
            generator: "jorgermduarte node-blog",
            author : configs.rss.author
        })
        
        var allPosts = await Post.Methods.GetAllPosts(10)

        allPosts.forEach(post => {
            feed.addItem({
                title: post.title,
                id: `https://${req.hostname}/post/${post._id}`,
                link: `https://${req.hostname}/post/${post._id}`,
                description: post.content,
                content: post.content
            })
        })

        configs.rss.categories.forEach( c => {
            feed.addCategory(c)
        })

        res.set('Content-Type', 'text/xml')

        res.send(feed.rss2())
    },
    ViewAuthRegister :( req,res) => {
        render({ req : req,  res : res, layout: 'auth', view : 'authregister.ejs' , data : null })
    },
    AuthUser :( req,res) => {
        res.send("to do")
    },
    Dashboard : (req,res) => {
        res.send("to do")
    }
}