import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableCharacteSetUtf81607311588450 implements MigrationInterface {

	public async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE scenario_initial_movies CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;`);
		await queryRunner.query(`ALTER TABLE languages CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;`);
		await queryRunner.query(`ALTER TABLE migrations CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;`);
		await queryRunner.query(`ALTER TABLE sale_areas CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;`);
		await queryRunner.query(`ALTER TABLE logs CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;`);
	}

	// tslint:disable-next-line: no-async-without-await
	public async down (queryRunner: QueryRunner): Promise<void> {
		// donothing
	}

}
