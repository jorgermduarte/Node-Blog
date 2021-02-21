const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const csp = require("helmet-csp")

const configs = require('./configurations/index')
const mongodb = require('./framework/mongoose')
const cspDirectives = require('./configurations/csp-directives')

const app = express()

app.use(cors(configs.cors))
app.use(helmet())
app.use(helmet.hidePoweredBy())
app.use(helmet.xssFilter())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cspDirectives.generateNonce)
app.use(csp({
    directives: cspDirectives.getDirectives(false)
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)

mongodb.Initialize()

let appRouter = new express.Router()
require('./routers/index.router.js')(appRouter)
app.use('/public',express.static( path.join(__dirname + './../', 'wwwroot')))
app.use('/',appRouter)

app.listen(configs.port, (err) => console.log(`Application initialized at port ${configs.port}`))