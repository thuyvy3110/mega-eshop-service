import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnToCampaign1607423110062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE campaigns
                                    ADD COLUMN \`periods\`        TEXT default NULL,
                                    ADD COLUMN goods        TEXT default NULL,
                                    ADD COLUMN due_date TEXT default NULL,
                                    ADD COLUMN image1       TEXT default NULL,
                                    ADD COLUMN image2       TEXT default NULL,
                                    ADD COLUMN image3       TEXT default NULL,
                                    ADD COLUMN image4       TEXT default NULL,
                                    ADD COLUMN image5       TEXT default NULL;`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE campaigns
                                    DROP COLUMN \`periods\`,
                                    DROP COLUMN goods,
                                    DROP COLUMN due_date,
                                    DROP COLUMN image1,
                                    DROP COLUMN image2,
                                    DROP COLUMN image3,
                                    DROP COLUMN image4,
                                    DROP COLUMN image5;`
        );
    }

}
