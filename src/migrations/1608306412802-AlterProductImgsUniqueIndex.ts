import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterProductImgsUniqueIndex1608306412802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_imgs\` DROP INDEX \`product_imgs_UNIQUE\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_imgs\` ADD UNIQUE INDEX \`product_imgs_UNIQUE\` (\`product_id\`, \`img\`);`);
    }

}
