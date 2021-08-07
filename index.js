require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routers = require('./routers/routers')
const errorHandler = require('./helpers/error.helper')

app.use(express.json())
app.use(require('cors')())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api', (req, res, next) => {
    res.json('Hello, Welcome to Elib! 🚀')
})

app.use('/api/auth', routers.auth)
app.use('/api/profile', routers.profile)
app.use('/api/users', routers.users)

app.use(errorHandler)

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    const port = process.env.PORT || 4000
    app.listen(port, () => console.log(`Server started on port ${port} \nWelcome to Elib Admin! 🚀`))
})