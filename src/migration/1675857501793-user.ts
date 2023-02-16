import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

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
                        name: "first_name",
                        type: "varchar",
                    },
                    {
                        name: "lname_name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
    
                    },
                    {
                        name: "is_active",
                        type: "boolean",
    
                    },
                    {
                        name: "is_deleted",
                        type: "boolean",
    
                    },
                    {
                        name: "created_by",
                        type: "varchar",
    
                    },
                    {
                        name: "updated_by",
                        type: "varchar",
    
                    },
                    {
                        name: "deleted_by",
                        type: "varchar",
    
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
    
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
    
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        default: "now()"
    
                    }

                ],
            })
        );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
