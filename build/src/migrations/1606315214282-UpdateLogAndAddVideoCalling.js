"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLogAndAddVideoCalling1606315214282 = void 0;
var tslib_1 = require("tslib");
var UpdateLogAndAddVideoCalling1606315214282 = (function () {
    function UpdateLogAndAddVideoCalling1606315214282() {
    }
    UpdateLogAndAddVideoCalling1606315214282.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("DROP TABLE IF EXISTS logs;")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("\n            CREATE TABLE `logs` (\n    `id`               BIGINT(20)   NOT NULL AUTO_INCREMENT,\n    `store_id`         BIGINT(20)   NOT NULL,\n    `customer_id`      BIGINT(20)   NULL,\n    `tapped_node_id`   BIGINT(20)   NULL,\n    `video_calling_id` BIGINT(20)   NULL,\n    `created_at`       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    `created_by`       VARCHAR(100) NOT NULL,\n    `updated_by`       VARCHAR(100) NOT NULL,\n    `updated_at`       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n    PRIMARY KEY (`id`)\n);\n")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("\nCREATE TABLE IF NOT EXISTS `video_calling` (\n  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,\n  `account_id` BIGINT(20) NOT NULL,\n  `campaign_store_id` BIGINT(20) NOT NULL,\n  `salesperson_id` BIGINT(20) NULL,\n  `started_at` DATETIME NULL,\n  `stopped_at` DATETIME NULL,\n  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  `created_by` VARCHAR(100) NOT NULL,\n  `updated_by` VARCHAR(100) NOT NULL,\n  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n  PRIMARY KEY (`id`),\n  INDEX `index2` (`account_id` ASC, `campaign_store_id` ASC, `salesperson_id` ASC),\n  INDEX `fk_video_calling_campaign_store_idx` (`campaign_store_id` ASC),\n  INDEX `fk_video_calling_salesperson_idx` (`salesperson_id` ASC),\n  CONSTRAINT `fk_video_calling_account`\n    FOREIGN KEY (`account_id`)\n    REFERENCES `tablet_accounts` (`id`)\n    ON DELETE NO ACTION\n    ON UPDATE NO ACTION,\n  CONSTRAINT `fk_video_calling_campaign_store`\n    FOREIGN KEY (`campaign_store_id`)\n    REFERENCES `campaign_stores` (`id`)\n    ON DELETE NO ACTION\n    ON UPDATE NO ACTION,\n  CONSTRAINT `fk_video_calling_salesperson`\n    FOREIGN KEY (`salesperson_id`)\n    REFERENCES `salespersons` (`id`)\n    ON DELETE NO ACTION\n    ON UPDATE NO ACTION)\nENGINE = InnoDB;\n        ")];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UpdateLogAndAddVideoCalling1606315214282.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("DROP TABLE `video_calling`;")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return UpdateLogAndAddVideoCalling1606315214282;
}());
exports.UpdateLogAndAddVideoCalling1606315214282 = UpdateLogAndAddVideoCalling1606315214282;
//# sourceMappingURL=1606315214282-UpdateLogAndAddVideoCalling.js.map