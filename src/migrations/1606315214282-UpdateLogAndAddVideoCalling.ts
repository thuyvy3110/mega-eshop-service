import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateLogAndAddVideoCalling1606315214282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS logs;`)
        await queryRunner.query(`
            CREATE TABLE \`logs\` (
    \`id\`               BIGINT(20)   NOT NULL AUTO_INCREMENT,
    \`store_id\`         BIGINT(20)   NOT NULL,
    \`customer_id\`      BIGINT(20)   NULL,
    \`tapped_node_id\`   BIGINT(20)   NULL,
    \`video_calling_id\` BIGINT(20)   NULL,
    \`created_at\`       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`created_by\`       VARCHAR(100) NOT NULL,
    \`updated_by\`       VARCHAR(100) NOT NULL,
    \`updated_at\`       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`)
);
`)
        await queryRunner.query(`
CREATE TABLE IF NOT EXISTS \`video_calling\` (
  \`id\` BIGINT(20) NOT NULL AUTO_INCREMENT,
  \`account_id\` BIGINT(20) NOT NULL,
  \`campaign_store_id\` BIGINT(20) NOT NULL,
  \`salesperson_id\` BIGINT(20) NULL,
  \`started_at\` DATETIME NULL,
  \`stopped_at\` DATETIME NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`created_by\` VARCHAR(100) NOT NULL,
  \`updated_by\` VARCHAR(100) NOT NULL,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX \`index2\` (\`account_id\` ASC, \`campaign_store_id\` ASC, \`salesperson_id\` ASC),
  INDEX \`fk_video_calling_campaign_store_idx\` (\`campaign_store_id\` ASC),
  INDEX \`fk_video_calling_salesperson_idx\` (\`salesperson_id\` ASC),
  CONSTRAINT \`fk_video_calling_account\`
    FOREIGN KEY (\`account_id\`)
    REFERENCES \`tablet_accounts\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_video_calling_campaign_store\`
    FOREIGN KEY (\`campaign_store_id\`)
    REFERENCES \`campaign_stores\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT \`fk_video_calling_salesperson\`
    FOREIGN KEY (\`salesperson_id\`)
    REFERENCES \`salespersons\` (\`id\`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`video_calling\`;`)
    }

}
