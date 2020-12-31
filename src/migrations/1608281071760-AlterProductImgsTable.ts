import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProductImgsTable1608281071760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_imgs\` ADD COLUMN \`field_name\` VARCHAR(45) NOT NULL AFTER \`product_id\`;`);
        await queryRunner.query(`ALTER TABLE \`product_imgs\` ADD UNIQUE INDEX \`product_id_field_name_UNIQUE\` (\`product_id\`, \`field_name\`);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_imgs\` DROP COLUMN \`field_name\`;`);
        await queryRunner.query(`ALTER TABLE \`product_imgs\` DROP INDEX \`product_id_field_name_UNIQUE\`;`);
    }

}
