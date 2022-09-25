import { MigrationInterface, QueryRunner } from "typeorm";

export class devicePreferencesUnique1664100431876 implements MigrationInterface {
    name = 'devicePreferencesUnique1664100431876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_preferences" ADD CONSTRAINT "user_device_pair" UNIQUE ("username", "device_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_preferences" DROP CONSTRAINT "user_device_pair"`);
    }

}
