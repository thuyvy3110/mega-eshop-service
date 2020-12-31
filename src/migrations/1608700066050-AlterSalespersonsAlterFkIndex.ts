import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterSalespersonsAlterFkIndex1608700066050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`salespersons\` ADD INDEX \`fk_salespersons_category_idx\` (\`category_id\` ASC);`);
        await queryRunner.query(`ALTER TABLE \`salespersons\` ADD CONSTRAINT \`fk_salespersons_category\`
        FOREIGN KEY (\`category_id\`)
        REFERENCES \`categories\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
