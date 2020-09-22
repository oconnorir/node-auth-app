// NPM MODULES
const express         = require('express')
const path            = require('path')
const expressSession  = require('express-session')
const passport        = require('passport')
const Auth0Strategy   = require('passport-auth0')
require('dotenv').config()


// DEFAULT EXPRESS FUNCTION
const app     = express()

// PORT SERVER FOR APP
const port    = process.env.PORT || 8888

// SESSION
const session = {
  secret: 'loxodonwarhammer',
  cookie: {},
  resave: false,
  ssaveUninitialized: false
}

if (app.get('env') === 'production') {
  //SERVE SECURE COOKIES, REQUIRES HTTPS
  session.coolie.secure = true
}

// PASSPORT


// PATH TO pug TEMPLATES
app.set('views', path.join(__dirname, 'views'))

// USE pug AS TEMPLATE ENGINE
app.set('view engine', 'pug')

// SERVE UP CSS, IMAGES, etc...
app.use(express.static(path.join(__dirname, 'public')))

// EXPRESS WILL USE express-session WITH session OBJECT
app.use(expressSession(session))



// ROUTES
app.get('/', (req, res) => {
  res.render('index', {title : 'Home'})
})

app.get('/user', (req, res) => {
  res.render('user', {title: 'Profile', userProfile: {nickname: 'Auth0'}})
})


// SERVER ACTIVATION
app.listen(port, () => {
  console.log(`node auth app listening on local port ${port}`)
})

