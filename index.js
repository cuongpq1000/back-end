const express = require('express');
const app = express();
const body = require("body-parser")
const passport = require('passport')
app.use(body.urlencoded({ extended: true }))
app.use(body.json())
const mongoose = require('mongoose');
const session = require('express-session')
const config = require('./config.json');
const MongoStore = require('connect-mongo')(session)
require('./passport')(passport)
mongoose.connect(config.connectionString, { useNewUrlParser: true })
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)
app.use(passport.initialize())
app.use(passport.session())
const port = process.env.port || 3030;
app.use('/auth', require('./router/oauth.router'));
app.use('/food-truck', require('./router/food_truck.router'));

app.listen(port, () =>{
    console.log("Server listening to port: " + port);
})