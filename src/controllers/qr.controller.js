let constants = require('../lib/constant')
const AWS = require('aws-sdk')
/* Connect S3 */
const s3 = new AWS.S3({
    accessKeyId: constants.S3_ACCESS_KEY_ID,
    secretAccessKey: constants.S3_ACCESS_SECRET,
    Bucket: constants.S3_BUCKET_NAME
})

/*
 * Function export qr image by id
 */
module.exports.getQrFromS3ById = async () => {
    const params = {
        Bucket: constants.S3_BUCKET_NAME,
        Key: 'demo/images/sample_aojiru_qr.png',
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
