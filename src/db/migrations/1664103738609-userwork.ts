import { MigrationInterface, QueryRunner } from "typeorm";

export class userwork1664103738609 implements MigrationInterface {
    name = 'userwork1664103738609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_work" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "work_id" integer NOT NULL, "last_paused_position" jsonb, "finished" boolean NOT NULL, "last_visited" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_02da10102e68306a59837a081c6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_work"`);
    }

}
