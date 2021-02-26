import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterVideoCallingTable1611122596144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0;');
        await queryRunner.query('ALTER TABLE video_calling DROP FOREIGN KEY `fk_video_calling_campaign_store`, DROP FOREIGN KEY `fk_video_calling_salesperson`, DROP FOREIGN KEY `fk_video_calling_account`');
        await queryRunner.query('ALTER TABLE video_calling DROP INDEX `fk_video_calling_campaign_store_idx`, DROP INDEX `fk_video_calling_salesperson_idx`, DROP INDEX `index2`');
        await queryRunner.query('ALTER TABLE video_calling ADD COLUMN `campaign_id` BIGINT(20) NOT NULL ');
        await queryRunner.query('ALTER TABLE video_calling ADD COLUMN `store_id` BIGINT(20) NOT NULL ');
        await queryRunner.query('ALTER TABLE video_calling DROP COLUMN campaign_store_id');
        await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1;');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE video_calling DROP COLUMN `campaign_id`');
        await queryRunner.query('ALTER TABLE video_calling DROP COLUMN `store_id`');
        await queryRunner.query('ALTER TABLE video_calling ADD COLUMN `campaign_store_id` BIGINT(20) NOT NULL ');
    }

}
