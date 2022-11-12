const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.port || 3030;
const config = require('./config/config.json')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

mongoose.connect(config.connectionString, {
    useNewUrlParser: true
})


require('./config/passport')(passport)

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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


app.use(require("./router/index.router"))
app.use('/auth', require('./router/auth.router'))

app.listen(port, () => {
    console.log("listen to " + port);
})

