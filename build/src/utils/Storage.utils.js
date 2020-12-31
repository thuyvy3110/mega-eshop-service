"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileFromS3 = exports.uploadToS3 = exports.uploadImageToS3 = exports.uploadVideoToS3 = exports.uploadFileToS3 = exports.checkBucketExists = exports.createBucket = exports.initStorage = exports.configDefaultStorage = exports.defaultStorageOptions = void 0;
var tslib_1 = require("tslib");
var aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var dotenv = tslib_1.__importStar(require("dotenv"));
dotenv.config();
function defaultStorageOptions() {
    var options = {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_ACCESS_SECRET,
    };
    return options;
}
exports.defaultStorageOptions = defaultStorageOptions;
function configDefaultStorage() {
    return aws_sdk_1.default.config.update(defaultStorageOptions());
}
exports.configDefaultStorage = configDefaultStorage;
function initStorage(options) {
    var storage;
    if (lodash_1.default.isEmpty(options)) {
        storage = new aws_sdk_1.default.S3(defaultStorageOptions());
        return storage;
    }
    storage = new aws_sdk_1.default.S3(options);
    return storage;
}
exports.initStorage = initStorage;
function createBucket(s3, bucketName, options) {
    try {
        s3.createBucket({ Bucket: bucketName, CreateBucketConfiguration: options });
        return null;
    }
    catch (error) {
        if (error.statusCode === 409) {
            console.log("Bucket " + bucketName + " has already existed.");
            return null;
        }
        console.log(bucketName + " failed to create.");
        return error;
    }
}
exports.createBucket = createBucket;
function checkBucketExists(s3, bucketName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, s3.headBucket({ Bucket: bucketName }).promise()];
                case 1:
                    _a.sent();
                    return [2, true];
                case 2:
                    error_1 = _a.sent();
                    if (error_1.statusCode === 404) {
                        return [2, false];
                    }
                    return [2, error_1];
                case 3: return [2];
            }
        });
    });
}
exports.checkBucketExists = checkBucketExists;
var bucketName = process.env.S3_BUCKET_NAME || '3dphantom';
function uploadFileToS3(filePath, key) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            if (key.indexOf('.mp4') != -1) {
                return [2, uploadVideoToS3(filePath, key)];
            }
            return [2, uploadImageToS3(filePath, key)];
        });
    });
}
exports.uploadFileToS3 = uploadFileToS3;
function uploadVideoToS3(filePath, key) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, uploadToS3(filePath, 'video', key, initStorage())];
        });
    });
}
exports.uploadVideoToS3 = uploadVideoToS3;
function uploadImageToS3(filePath, key) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, uploadToS3(filePath, 'images', key, initStorage())];
        });
    });
}
exports.uploadImageToS3 = uploadImageToS3;
function uploadToS3(filePath, type, key, s3) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var readStream, params;
        return tslib_1.__generator(this, function (_a) {
            readStream = fs_1.default.createReadStream(filePath);
            params = {
                Bucket: bucketName,
                Body: readStream,
                Key: "demo/" + type + "/" + key
            };
            return [2, new Promise(function (resolve, reject) {
                    s3.upload(params, function (error, data) {
                        readStream.destroy();
                        if (error) {
                            return reject(error);
                        }
                        console.log('uploaded', data);
                        return resolve(data);
                    });
                })];
        });
    });
}
exports.uploadToS3 = uploadToS3;
function getFileFromS3(key) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var params, s3, url, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!key.startsWith("demo/")) {
                        return [2, key];
                    }
                    params = {
                        Bucket: bucketName,
                        Key: key,
                        Expires: 604800
                    };
                    s3 = initStorage();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, s3.getSignedUrlPromise('getObject', params)];
                case 2:
                    url = _a.sent();
                    return [2, url];
                case 3:
                    error_2 = _a.sent();
                    return [2, error_2];
                case 4: return [2];
            }
        });
    });
}
exports.getFileFromS3 = getFileFromS3;
//# sourceMappingURL=Storage.utils.js.map