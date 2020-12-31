const jsonwebtoken = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')
const superagent = require('superagent')
const { POOL_ID_ADMIN, POOL_ID_SALES_PERSON, POOL_ID_TABLET, POOL_ID_DISPLAY } = require('../lib/constant')

function getJwkKey(poolname) {
    switch (poolname) {
        case POOL_ID_ADMIN:
            return superagent.get(
                `https://cognito-idp.ap-northeast-1.amazonaws.com/${process.env.POOL_ID_ADMIN}/.well-known/jwks.json`
            )
        case POOL_ID_SALES_PERSON:
            return superagent.get(
                `https://cognito-idp.ap-northeast-1.amazonaws.com/${process.env.POOL_ID_SALES_PERSON}/.well-known/jwks.json`
            )
        case POOL_ID_TABLET:
            return superagent.get(
                `https://cognito-idp.ap-northeast-1.amazonaws.com/${process.env.POOL_ID_TABLET}/.well-known/jwks.json`
            )
        case POOL_ID_DISPLAY:
            return superagent.get(
                `https://cognito-idp.ap-northeast-1.amazonaws.com/${process.env.POOL_ID_DISPLAY}/.well-known/jwks.json`
            )
    }
}

const decodeTokenHeader = (token) => {
    const [headerEncoded] = token.split('.')
    const buff = new Buffer.from(headerEncoded, 'base64')
    const text = buff.toString('ascii')

    return JSON.parse(text)
}

const getJsonWebKeyWithKID = (kid, token, poolname) => {
    return getJwkKey(poolname)
        .then(async (resp) => {
            const { keys } = JSON.parse(resp.text)

            for (let jwk of keys) {
                if (jwk.kid === kid) {
                    return verifyJsonWebTokenSignature(token, jwk)
                }
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports.validate = async function (token, poolname) {
    const header = decodeTokenHeader(token)

    const data = await getJsonWebKeyWithKID(header.kid, token, poolname)

    if (data) {
        return true
    }

    return false
}

const verifyJsonWebTokenSignature = (token, jsonWebKey) => {
    const pem = jwkToPem(jsonWebKey)

    let decodedToken = ''

    try {
        decodedToken = jsonwebtoken.verify(token, pem, {
            algorithms: ['RS256']
        })
        console.log(decodedToken)
    } catch (err) {
        console.error(err)
    }

    return decodedToken
}
