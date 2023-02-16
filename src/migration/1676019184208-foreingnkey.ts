import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"


// export class foreingnkey1676019184208 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.addColumn(
//             "details",
//             new TableColumn({
//                 name:"user_id",
//                 type:"int"
//             })  
//         )    
        
//         await queryRunner.createForeignKey(
//             "details",
//             new TableForeignKey({
//                 columnNames:["user_id"],
//                 referencedTableName:"user",
//                 referencedColumnNames:["id"]
//             })  
//         )
//            }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         queryRunner.dropColumn("details","user_Id")
//     }

// }
