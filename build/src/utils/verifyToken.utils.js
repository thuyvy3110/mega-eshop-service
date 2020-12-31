"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var tslib_1 = require("tslib");
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var jwk_to_pem_1 = tslib_1.__importDefault(require("jwk-to-pem"));
var superagent_1 = tslib_1.__importDefault(require("superagent"));
var _a = require('../lib/constant'), POOL_ID_ADMIN = _a.POOL_ID_ADMIN, POOL_ID_SALES_PERSON = _a.POOL_ID_SALES_PERSON, POOL_ID_TABLET = _a.POOL_ID_TABLET, POOL_ID_DISPLAY = _a.POOL_ID_DISPLAY;
var getJwkKey = function (poolname) {
    switch (poolname) {
        case POOL_ID_ADMIN:
            return superagent_1.default.get("https://cognito-idp.ap-northeast-1.amazonaws.com/" + process.env.POOL_ID_ADMIN + "/.well-known/jwks.json");
        case POOL_ID_SALES_PERSON:
            return superagent_1.default.get("https://cognito-idp.ap-northeast-1.amazonaws.com/" + process.env.POOL_ID_SALES_PERSON + "/.well-known/jwks.json");
        case POOL_ID_TABLET:
            return superagent_1.default.get("https://cognito-idp.ap-northeast-1.amazonaws.com/" + process.env.POOL_ID_TABLET + "/.well-known/jwks.json");
        case POOL_ID_DISPLAY:
            return superagent_1.default.get("https://cognito-idp.ap-northeast-1.amazonaws.com/" + process.env.POOL_ID_DISPLAY + "/.well-known/jwks.json");
    }
};
var decodeTokenHeader = function (token) {
    var headerEncoded = token.split('.')[0];
    var buff = Buffer.from(headerEncoded, 'base64');
    var text = buff.toString('ascii');
    return JSON.parse(text);
};
var getJsonWebKeyWithKID = function (kid, token, poolname) {
    return getJwkKey(poolname)
        .then(function (resp) {
        var keys = JSON.parse(resp.text).keys;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var jwk = keys_1[_i];
            if (jwk.kid === kid) {
                return verifyJsonWebTokenSignature(token, jwk);
            }
        }
    })
        .catch(function (error) {
        console.log(error);
    });
};
var verifyJsonWebTokenSignature = function (token, jsonWebKey) {
    var pem = jwk_to_pem_1.default(jsonWebKey);
    var decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, pem, { algorithms: ['RS256'] });
        console.log(decodedToken);
        return decodedToken;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
var validate = function (token, poolname) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var header, data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                header = decodeTokenHeader(token);
                return [4, getJsonWebKeyWithKID(header.kid, token, poolname)];
            case 1:
                data = _a.sent();
                if (data) {
                    return [2, true];
                }
                return [2, false];
        }
    });
}); };
exports.validate = validate;
//# sourceMappingURL=verifyToken.utils.js.map