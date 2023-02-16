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
exports.brand1676457976370 = void 0;
const typeorm_1 = require("typeorm");
class brand1676457976370 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "brand",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: "brand_name",
                        type: "varChar",
                    },
                    {
                        name: "product_id",
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
            })),
                true;
            yield queryRunner.createForeignKey("brand", new typeorm_1.TableForeignKey({
                columnNames: ["product_id"],
                referencedTableName: "product",
                referencedColumnNames: ["id"],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.brand1676457976370 = brand1676457976370;
