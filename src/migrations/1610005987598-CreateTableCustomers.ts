import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableCustomers1610005987598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
			`
			CREATE TABLE customers (
                id BIGINT(20) NOT NULL AUTO_INCREMENT,
                type VARCHAR(100) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                created_by VARCHAR(100) NOT NULL,
                updated_by VARCHAR(100) NOT NULL,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
                ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
			`
		);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
			'DROP TABLE IF EXISTS customers;'
		);
    }

}