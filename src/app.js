const express = require('express')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitizer = require('express-mongo-sanitize')
const globalErrorHandler = require('./utils/errors/GlobalErrorHandler')
const AppErrorHandler = require('./utils/errors/appError')
const postRouter = require("./routes/postRoutes")
const authRouter = require("./routes/authRoutes")


const app = express()

//Setting HTTP security headers
app.use(helmet())

//Prevent DoS Attacks via body limiting
app.use(express.json({limit: "50kb"}))

//Rate limiter, preventing Brute Force and DoS Attacks
const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes).
	message: "Too many requests, please try later"
})

//It's used for all routes in this case
app.use("/api", limiter)

//Prevent NoSQL query injections via data sanitization
app.use(mongoSanitizer())

//Prevent XSS attacks via data sanitization
app.use(xss())

//Routes
app.use("/api/v1/post", postRouter)
app.use("/api/v1/auth", authRouter)

//Error handler for not defined routes
app.all("*",(req, res, next) => {

    const error = new AppErrorHandler("Route is not defined", 404)

    next(error)
})

//Global error handler
app.use(globalErrorHandler)



module.exports = app