// Imports
const express = require('express')

// Create Dashboard
const app = express()

// Start Dashboard
app.listen(3000)

// Routes
app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/lol', function(req, res) {
    res.send('lol')
})