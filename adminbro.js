const express = require('express')
const formidableMiddleware = require('express-formidable')
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')

var MongoDB = require('./framework/mongoose')
AdminBro.registerAdapter(require('admin-bro-mongoose'))

const app = express()
app.use(formidableMiddleware())

var Post = require('./schemas/post.schema');
var User = require('./schemas/user.schema');

const adminBro = new AdminBro({
  resources: [Post.Schema,User.Schema],
  rootPath: '/',
  branding: {
    companyName: 'Blog Posts',
  },
})

const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

const run = async () => {
  await  MongoDB.Initialize()
  await app.listen(8080, () => console.log(`Admin bro listening on port 8080!`))
}

run()