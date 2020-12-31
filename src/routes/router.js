const express = require('express')
const version = process.env.API_VERSION
const versionApiRouter = require(`./${version}`)

const apiRoute = express.Router()

apiRoute.use(`/${process.env.API_VERSION}`, versionApiRouter)

module.exports = apiRoute
