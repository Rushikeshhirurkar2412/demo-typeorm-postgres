import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export default class product1675857514392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "Product_name",
            type: "varChar",
          },
          {
            name: "selling_price",
            type: "varChar",
          },
          {
            name: "description",
            type: "varChar",
          },
          {
            name: "sort",
            type: "int",
          },  
          {
            name: "quantity",
            type: "int",
          },
          {
            name: "category_id",
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
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    ),
      true;

    await queryRunner.createForeignKey(
      "product",
      new TableForeignKey({
        columnNames: ["category_id"],
        referencedTableName: "category",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product");
  }
}
