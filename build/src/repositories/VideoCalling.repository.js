"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCallingRepository = void 0;
var tslib_1 = require("tslib");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var VideoCalling_1 = require("../models/entities/VideoCalling");
var VideoCallingRepository = (function (_super) {
    tslib_1.__extends(VideoCallingRepository, _super);
    function VideoCallingRepository() {
        return _super.call(this, VideoCalling_1.VideoCalling) || this;
    }
    return VideoCallingRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.VideoCallingRepository = VideoCallingRepository;
//# sourceMappingURL=VideoCalling.repository.js.map