import { MigrationInterface, QueryRunner } from "typeorm";

export class highlights1661169453440 implements MigrationInterface {
    name = 'highlights1661169453440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "highlight" ("id" SERIAL NOT NULL, "creator_username" character varying NOT NULL, "work_id" integer NOT NULL, "chapter_id" integer NOT NULL, "start_tag" integer NOT NULL, "end_tag" integer NOT NULL, "note" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_0f4191998a1e1e8f8455f1d4adb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59db2ab37582213593f507d9aa" ON "highlight" ("work_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_59db2ab37582213593f507d9aa"`);
        await queryRunner.query(`DROP TABLE "highlight"`);
    }

}
