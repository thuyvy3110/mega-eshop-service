const express = require('express')
const scenarioController = require('../../controllers/video.controller')
let constants = require('../../lib/constant')
const verifyToken = require('../../utils/verifyToken')

const router = express.Router()

router.get('/:id', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getVideoFromS3ById(req.params.id)

        if (data != undefined) {
            res.json({
                status: 200,
                data: data
            })
        } else {
            res.json({
                status: 400,
                message: constants.ERROR_RESPONSE
            })
        }
    } else
        res.status(401).json({ message: constants.UNAUTHORIZED_ERR })
})

module.exports = router
