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
                        name: "created_by",
                        type: "varchar",
                        isNullable:true

                    },
                    {
                        name: "updated_by",
                        type: "varchar",
                        isNullable:true
                    },
                    {
                        name: "deleted_by",
                        type: "varchar",
                        isNullable:true
    
                    },
                    {
                        name: "created_at",
                        type: "varchar",
                        isNullable:true

    
                    },
                    {
                        name: "updated_at",
                        type: "varchar",
                        isNullable:true
    
                    },
                    {
                        name: "deleted_at",
                        type: "varchar",
                        isNullable:true
    
                    }

                ]
            })
        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("category");

    }

}
