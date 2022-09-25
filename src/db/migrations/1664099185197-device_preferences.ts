import { MigrationInterface, QueryRunner } from "typeorm";

export class devicePreferences1664099185197 implements MigrationInterface {
    name = 'devicePreferences1664099185197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device_preferences" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "device_id" character varying NOT NULL, "display_preferences" jsonb NOT NULL DEFAULT '{}', "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_e358044f3e3940b75b7ec142856" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "device_preferences"`);
    }

}
