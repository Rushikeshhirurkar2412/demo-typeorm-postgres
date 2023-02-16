import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class category1676031854939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "category",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,

                    },
                    {
                        name:"category_name",
                        type:"varChar",   
                    },
                    {
                        name:"parent_category_id",
                        type:"int",   
                    },
                    {
                        name:"sort",
                        type:"int",   
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

                ]
            })
        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("category");

    }

}
