import { MigrationInterface, QueryRunner, Table } from "typeorm"

export default class user1675857501793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated:true,
                    },
                    {
                        name: "fname",
                        type: "varchar",
                    },
                    {
                        name: "lname",
                        type: "varchar",
                    },
                    {
                        name: "age",
                        type: "int",
                    },
                    {
                        name: "city",
                        type: "varchar",
                    },
                    {
                        name: "state",
                        type: "varchar",
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
