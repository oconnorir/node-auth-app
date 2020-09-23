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
  saveUninitialized: false
}

if (app.get('env') === 'production') {
  //SERVE SECURE COOKIES, REQUIRES HTTPS
  session.cookie.secure = true
}

// PASSPORT
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8888/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile)
  }
)

// PATH TO pug TEMPLATES
app.set('views', path.join(__dirname, 'views'))

// USE pug AS TEMPLATE ENGINE
app.set('view engine', 'pug')

// SERVE UP CSS, IMAGES, etc...
app.use(express.static(path.join(__dirname, 'public')))

// EXPRESS WILL USE express-session WITH session OBJECT
app.use(expressSession(session))

passport.use(strategy)
app.use(passport.initialize())
app.use(passport.session())




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

