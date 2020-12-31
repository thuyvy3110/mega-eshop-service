import {MigrationInterface, QueryRunner} from "typeorm";

export class AddQrTypeToScenarioTree1607137353070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE scenario_trees ADD COLUMN scenario_reference varchar(100) default '';`);
        await queryRunner.query(`ALTER TABLE scenario_trees ADD COLUMN scenario_reference_id BIGINT(20);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE scenario_trees DROP COLUMN scenario_reference;`);
        await queryRunner.query(`ALTER TABLE scenario_trees DROP COLUMN scenario_reference_id;`);
    }
}
