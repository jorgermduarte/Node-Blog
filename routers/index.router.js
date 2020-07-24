var IndexController = require('./../controllers/index.controller')

module.exports  = (router) => {

    router
    .route('/')
    .get(IndexController.MainPage)

    router
    .route('/post/:id')
    .get(IndexController.ViewPost)
    
    // router
    // .route('/admin/post/:id')
    // .get()


    // router
    // .route('/admin')
    // .get()

}