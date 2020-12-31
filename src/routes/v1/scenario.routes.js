const express = require('express')
const scenarioController = require('../../controllers/scenario.controller')
const { ERROR_RESPONSE, UNAUTHORIZED_ERR } = require('../../lib/constant')
const verifyToken = require('../../utils/verifyToken')

const router = express.Router()

router.get('/all', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getAllScenarioNested()

        if (data != undefined) {
            res.status(200).json({ data })
        } else {
            res.status(400).json({ message: ERROR_RESPONSE })
        }
    } else
        res.status(401).json({ message: UNAUTHORIZED_ERR })
})

router.get('/all-without-level1', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getAllScenarioNestedWithoutLevel1()

        if (data != undefined) {
            res.status(200).json({ data })
        } else {
            res.status(400).json({ message: ERROR_RESPONSE })
        }
    } else
        res.status(401).json({ message: UNAUTHORIZED_ERR })
})

router.get('/:id', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getScenarioById(req.params.id)

        if (data != undefined) {
            res.json({
                status: 200,
                data: data
            })
        } else {
            res.json({
                status: 400,
                message: ERROR_RESPONSE
            })
        }
    } else
        res.status(401).json({ message: UNAUTHORIZED_ERR })
})

router.get('/:id/attribute', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getAttributeById(req.params.id)

        if (data != undefined) {
            res.json({
                status: 200,
                data: data
            })
        } else {
            res.json({
                status: 400,
                message: ERROR_RESPONSE
            })
        }
    } else
        res.status(401).json({ message: UNAUTHORIZED_ERR })
})

router.get('/:id/value', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getValueById(req.params.id)

        if (data != undefined) {
            res.json({
                status: 200,
                data: data
            })
        } else {
            res.json({
                status: 400,
                message: ERROR_RESPONSE
            })
        }
    } else
        res.status(401).json({ message: UNAUTHORIZED_ERR })
})

router.get('/:id/name', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getNameById(req.params.id)

        if (data != undefined) {
            res.json({
                status: 200,
                data: data
            })
        } else {
            res.json({
                status: 400,
                message: ERROR_RESPONSE
            })
        }
    } else
    res.status(401).json({ message: UNAUTHORIZED_ERR })
})

router.get('/:id/type', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getTypeById(req.params.id)

        if (data != undefined) {
            res.json({
                status: 200,
                data: data
            })
        } else {
            res.json({
                status: 400,
                message: ERROR_RESPONSE
            })
        }
    } else
        res.status(401).json({ message: UNAUTHORIZED_ERR })
})

router.get('/:id/level', async (req, res) => {
    const { poolname } = req.headers
    const token = req.header('Authorization').replace('Bearer ', '')
    const isValidToken = await verifyToken.validate(token, poolname)

    if (isValidToken) {
        let data = await scenarioController.getLevelById(req.params.id)

        if (data != undefined) {
            res.json({
                status: 200,
                data: data
            })
        } else {
            res.json({
                status: 400,
                message: ERROR_RESPONSE
            })
        }
    } else
        res.status(401).json({ message: UNAUTHORIZED_ERR })
})

module.exports = router
