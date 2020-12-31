import { query } from 'express';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Scenario1605774395815 implements MigrationInterface {
	async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
				`
			ALTER TABLE scenarios
			ADD COLUMN content TEXT AFTER client_id,
			ADD COLUMN campaign_id BIGINT(20) NOT NULL AFTER client_id,
			ADD COLUMN category_id BIGINT(20) NOT NULL AFTER client_id,
			ADD CONSTRAINT fk_scenarios_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
			ADD CONSTRAINT fk_scenarios_category FOREIGN KEY (category_id) REFERENCES categories(id);
			`
		);
	}

	async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
				`
			ALTER TABLE scenarios DROP FOREIGN KEY fk_scenarios_campaign;
			ALTER TABLE scenarios DROP FOREIGN KEY fk_scenarios_category;
			ALTER TABLE scenarios DROP COLUMN category_id;
			ALTER TABLE scenarios DROP COLUMN campaign_id;
			ALTER TABLE scenarios DROP COLUMN content;
			`
		);
	}
}