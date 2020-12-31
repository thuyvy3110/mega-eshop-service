import {MigrationInterface, QueryRunner} from 'typeorm';

export class CampaignStore1603855010025 implements MigrationInterface {
	async up (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`
			alter table campaign_stores
    			drop index \`campaign_id_UNIQUE\`;
			`
		);
	}

	async down (queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			''
		);
	}
}