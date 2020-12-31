import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterClientsTable1609210765073 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` ADD COLUMN \`description\` VARCHAR(100) NOT NULL AFTER \`parent_client_id\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`description\`;`);
    }

}
