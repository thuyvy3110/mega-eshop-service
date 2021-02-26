import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHeaderImageColumnToClients1610353900397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE clients ADD COLUMN header_image LONGTEXT AFTER description');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE clients DROP COLUMN header_image');
    }

}
