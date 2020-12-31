const express = require('express')
const scenarioController = require('../../controllers/scenario.controller')
let constants = require('../../lib/constant')
const router = express.Router()
const verifyToken = require('../../utils/verifyToken')

router.get('/', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getAllScenarioNested()

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
