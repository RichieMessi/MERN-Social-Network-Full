const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressJwt = require('express-jwt')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
dotenv.config()

// PORT
const PORT = process.env.PORT || 8080 ;

// DATABASE
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => console.log`========= DB Connection Error ${err} =========`)


// ROUTES
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')


// MIDDLEWARE
app.use(cors())
app.use(expressValidator());
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
// ROUTES
app.use('/api', postRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: "Unauthorized!"
        })
    }
})





app.listen(PORT, () => console.warn(`LISTENING AT PORT ${PORT}`))
