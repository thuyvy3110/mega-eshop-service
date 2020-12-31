"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var tslib_1 = require("tslib");
var Storage_utils_1 = require("./Storage.utils");
function upload(request, fieldName, fileKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var file, name, result, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!request.files[fieldName]) {
                        throw new Error('file not found');
                    }
                    file = request.files[fieldName];
                    name = file.name;
                    console.log(file.tempFilePath);
                    fileKey += name.substring(name.lastIndexOf('.'));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    result = '';
                    if (!(fieldName === 'image')) return [3, 3];
                    return [4, Storage_utils_1.uploadImageToS3(file.tempFilePath, fileKey)];
                case 2:
                    result = _a.sent();
                    return [3, 5];
                case 3: return [4, Storage_utils_1.uploadFileToS3(file.tempFilePath, fileKey)];
                case 4:
                    result = _a.sent();
                    _a.label = 5;
                case 5: return [2, result.Key];
                case 6:
                    error_1 = _a.sent();
                    console.log(error_1);
                    throw error_1;
                case 7: return [2];
            }
        });
    });
}
exports.upload = upload;
//# sourceMappingURL=Upload.utils.js.map