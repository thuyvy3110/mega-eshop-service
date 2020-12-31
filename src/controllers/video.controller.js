const gasController = require('./gas.controller')
let constants = require('../lib/constant')
const AWS = require('aws-sdk')
/* Connect S3 */
const s3 = new AWS.S3({
    accessKeyId: constants.S3_ACCESS_KEY_ID,
    secretAccessKey: constants.S3_ACCESS_SECRET,
    Bucket: constants.S3_BUCKET_NAME
})

/*
 * Function export scenario by id
 */
module.exports.getVideoByScenarioId = async (id) => {
    let data = await gasController.getScenarioAllLevel()
    let scenarioValue = ''
    let scenarioCollection = data.data

    scenarioCollection.forEach((item) => {
        if (item.id == id && item.type == process.env.SCENARIO_MOVIE) {
            scenarioValue = item
        } else {
            scenarioValue = {
                message: constants.ERROR_FORMAT_RESPONSE
            }
        }
    })

    return scenarioValue
}

/*
 * Function export scenario by id
 */
module.exports.getVideoFromS3ById = async (id) => {
    const params = {
        Bucket: constants.S3_BUCKET_NAME,
        Key: `demo/video/scenario_${id}.mp4`,
        Expires: 604800
    }

    try {
        const url = await new Promise((resolve, reject) => {
            s3.getSignedUrl('getObject', params, (err, url) => {
                err ? reject(err) : resolve(url)
            })
        })

        return url
    } catch (err) {
        if (err) {
            return err
        }
    }
}
