const express = require('express')
const configs = require('./configurations')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
let path = require('path')
let expressLayouts = require('express-ejs-layouts')

let app = express()
let mongodb = require('./framework/mongoose')

app.use(helmet())
app.use(cors(configs.cors))
app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/public',express.static(path.join(__dirname + '/', 'public')))
app.use(expressLayouts)
app.use(bodyParser.json())

mongodb.Initialize()

var appRouter = new express.Router()
require('./routers/index.router.js')(appRouter)

app.use('/',appRouter)

app.listen(configs.port, (err) => console.log(`Application initialized at port ${configs.port}`))