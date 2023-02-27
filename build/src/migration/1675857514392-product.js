"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class product1675857514392 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
                        isNullable: true
                    },
                    {
                        name: "updated_by",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "deleted_by",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "updated_at",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "deleted_at",
                        type: "varchar",
                        isNullable: true
                    }
                ],
            })),
                true;
            yield queryRunner.createForeignKey("product", new typeorm_1.TableForeignKey({
                columnNames: ["category_id"],
                referencedTableName: "category",
                referencedColumnNames: ["id"],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("product");
        });
    }
}
exports.default = product1675857514392;
