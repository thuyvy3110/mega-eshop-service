import { MigrationInterface, QueryRunner } from 'typeorm';

export class Scenario1602643455597 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`
			CREATE TABLE IF NOT EXISTS scenarios(
				id INT(20) AUTO_INCREMENT PRIMARY KEY,
				scenario_name VARCHAR(200),
				client_id BIGINT(20) NOT NULL COMMENT 'クライアントID',
				category_id INT(8) NOT NULL DEFAULT 0,
				campaign_id INT(20) NOT NULL DEFAULT 0,
				content TEXT,
				updated_by VARCHAR(100) NOT NULL COMMENT '更新者',
				updated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日',
  				created_bY VARCHAR(100) NOT NULL COMMENT '登録者',
  				created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登録日',
				  UNIQUE INDEX scenarios_UNIQUE (scenario_name ASC, client_id ASC),
				  INDEX fk_scenarios_clients1_idx (client_id ASC),
				  CONSTRAINT fk_scenarios_clients1 FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE NO ACTION ON UPDATE NO ACTION
				) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
			`
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'DROP TABLE IF EXISTS scenarios;'
		);
	}
}