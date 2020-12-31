const express = require('express')
const scenarioRouter = require('./scenario.routes')
const gasRouter = require('./gas.routes')
const videoRouter = require('./video.routes')
const qrRouter = require('./qr.routes')

const apiRoute = express.Router()

apiRoute.use('/scenario', scenarioRouter)
apiRoute.use('/gas', gasRouter)
apiRoute.use('/video', videoRouter)
apiRoute.use('/qr', qrRouter)

module.exports = apiRoute
