import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterCampaignTable1611128596960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaigns\` ADD COLUMN \`url\` VARCHAR(200) NOT NULL AFTER \`content\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaigns\` DROP COLUMN \`url\`;`);
    }

}
