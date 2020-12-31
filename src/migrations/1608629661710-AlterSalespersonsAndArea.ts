import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterSalespersonsAndArea1608629661710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 0;`);
        await queryRunner.query(`ALTER TABLE \`salespersons\` DROP COLUMN \`area\`;`);
        await queryRunner.query(`ALTER TABLE \`sale_areas\` CHANGE COLUMN \`id\` \`id\` BIGINT(20) NOT NULL AUTO_INCREMENT ;`);
        await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`salespersons\` ADD COLUMN \`area\` VARCHAR(200);`);
    }

}
