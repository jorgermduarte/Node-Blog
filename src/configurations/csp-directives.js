const uuid = require('uuid')

const self = `'self'`
const unsafeInline = `'unsafe-inline'`


var methods = {
    getNonce : (req,res) => {
        return `'nonce-${ res.locals.nonce }'`
    },
    getDirectives : (authorityIsSecure = true) => {

        const scripts = [
            'https://cdn.jsdelivr.net/',
            'https://cdnjs.cloudflare.com/',
            'https://code.jquery.com/'
        ]
        const styles = [
          `https://fonts.googleapis.com/`,
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com'
        ]
        const fonts = [
            `https://fonts.gstatic.com/`,
        ]
        const frames = [
          `https://www.youtube.com/`,
          `https://player.vimeo.com/`,
          `https://codepen.io/`
        ]
        const images = [
            `https:`,
            `data:`
        ]

        const connect = [
          `https://maps.googleapis.com/`
        ]


        var directives =  {
            defaultSrc: [self],
            scriptSrc: [self, methods.getNonce, ...scripts],
            styleSrc: [self, unsafeInline, ...styles],
            fontSrc: [self, ...fonts],
            frameSrc: [self, ...frames],
            connectSrc: [self, ...connect],
            imgSrc: [self, ...images],
            objectSrc: [self],

        }

        return directives
    },
    generateNonce : (req,res,next) => {
        const rhyphen = /-/g
        res.locals.nonce = uuid.v4().replace(rhyphen, ``)
        next()
    }
}

module.exports = methods