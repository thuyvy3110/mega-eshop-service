import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnToSalespersons1604655977157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE salespersons ADD COLUMN account VARCHAR(100) NOT NULL AFTER name');
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE salespersons DROP COLUMN account');
    }

}
