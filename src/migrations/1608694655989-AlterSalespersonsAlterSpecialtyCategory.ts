import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterSalespersonsAlterSpecialtyCategory1608694655989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`salespersons\` CHANGE COLUMN \`specialty_category\` \`category_id\` BIGINT(20) NULL DEFAULT NULL COMMENT '得意分野' ;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
