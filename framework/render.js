module.exports = ({ req, res , view ,layout = "default", data = {} } ) => {
    res.render('pages/' + view ,{ layout : 'layouts/' + layout + '/index.ejs',  data : data })
}