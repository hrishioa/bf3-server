import { MigrationInterface, QueryRunner } from "typeorm";

export class highlights21661177952478 implements MigrationInterface {
    name = 'highlights21661177952478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "highlight" ADD "highlight_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "highlight" DROP COLUMN "highlight_id"`);
    }

}
