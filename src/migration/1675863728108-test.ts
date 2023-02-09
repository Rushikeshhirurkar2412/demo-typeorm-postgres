import { MigrationInterface, QueryRunner } from "typeorm"

export class test1675863728108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.query('ALTER TABLE product ADD description VARCHAR')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
