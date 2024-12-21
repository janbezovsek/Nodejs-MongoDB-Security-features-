const express = require('express')
const globalErrorHandler = require('./utils/errors/GlobalErrorHandler')
const AppErrorHandler = require('./utils/errors/appError')
const postRouter = require("./routes/postRoutes")


const app = express()

app.use(express.json())

app.use("/api/v1/post", postRouter)

app.all("*",(req, res, next) => {

    const error = new AppErrorHandler("Route is not defined", 404)

    next(error)
})

app.use(globalErrorHandler)







module.exports = app