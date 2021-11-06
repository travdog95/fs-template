//Only load dotenv if we're not in production environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//Default router
const indexRouter = require('./routes/index');
const authorRouter = require("./routes/authors");

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout') //Every file will use this as an HTML template
app.use(expressLayouts)
app.use(express.static('public')) //Style sheets, js files, images

// Parses body to json
app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: true }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//Route to default router
app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)