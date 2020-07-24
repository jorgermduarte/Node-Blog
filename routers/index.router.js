var IndexController = require('./../controllers/index.controller')

module.exports  = (router) => {

    router
    .route('/')
    .get(IndexController.MainPage)

    router
    .route('/post/:id')
    .get(IndexController.ViewPost)
    

    // router
    // .route('/admin')
    // .get()

    // router
    // .route('/admin/post/:id')
    // .get()

}