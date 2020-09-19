// NPM MODULES
const express = require('express')
const path    = require('path')

// DEFAULT EXPRESS FUNCTION
const app     = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

// PORT SERVER FOR APP
const port    = process.env.PORT || 8888

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

