// Imports
const express = require('express')

// Create Dashboard
const app = express()
app.enable('trust proxy') // if the ip is ::1 it means localhost
app.set('etag', false) // disable chache
app.use(express.static(__dirname + '/dashboard'))

app.use((req, res, next) => {
    console.log(`- ${req.method}: ${req.url} ${res.statusCode} (by: ${req.ip})`)
    next()
})

app.get('/', async (req, res) => {
    res.sendFile('src/dashboard/html/home.html')
})

// Start Dashboard
app.listen(3000)

