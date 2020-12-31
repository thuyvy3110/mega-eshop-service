import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateScenarioTreeAndInitialDB1606705240119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE scenario_initial_movies DROP FOREIGN KEY \`fk_scenario_initial_movies_scenarios1\`;`)
        await queryRunner.query(`ALTER TABLE scenario_trees DROP FOREIGN KEY \`fk_scenario_trees_scenarios1\`;`)
        await queryRunner.query(`ALTER TABLE scenario_initial_movies ADD CONSTRAINT \`fk_scenario_initial_movies_scenarios1\`
    FOREIGN KEY (\`scenario_id\`)
    REFERENCES \`scenarios\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION;`);
        await queryRunner.query(`ALTER TABLE scenario_trees ADD CONSTRAINT \`fk_scenario_trees_scenarios1\`
    FOREIGN KEY (\`scenario_id\`)
    REFERENCES \`scenarios\` (\`id\`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION;`);

        await queryRunner.query(`ALTER TABLE scenario_trees ADD COLUMN mpath varchar(100) default '';`);
        await queryRunner.query(`ALTER TABLE scenario_initial_movies ADD COLUMN disp_value varchar(100) default '';`);
        await queryRunner.query(`ALTER TABLE scenario_initial_movies MODIFY id int auto_increment`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
