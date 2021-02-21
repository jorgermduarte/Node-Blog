const indexController = require('../controllers/index.controller')
var IndexController = require('../controllers/index.controller')

module.exports  = (router) => {

    router
    .route('/')
    .get(IndexController.MainPage)
    router
    .route('/post/:id')
    .get(IndexController.ViewPost)
    router
    .route('/rss')
    .get(IndexController.RssFeed)

    router
    .route('/auth')
    .get(indexController.ViewAuthRegister)
    .post(indexController.AuthUser)
    router
    .route('/dashboard')
    .get(indexController.Dashboard)
}