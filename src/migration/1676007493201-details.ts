import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class details1676007493201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "User_details",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated:true,
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
                    {
                        name: "user_id",
                        type: "int",
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
        ),true


        await queryRunner.createForeignKey(
            "User_details",
            new TableForeignKey({
                columnNames:["user_id"],
                referencedTableName:"user",
                referencedColumnNames:["id"]
            })  
        )
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('User_details');
    }

}
