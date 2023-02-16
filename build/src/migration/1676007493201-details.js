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
exports.details1676007493201 = void 0;
const typeorm_1 = require("typeorm");
class details1676007493201 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "User_details",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
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
            })), true;
            yield queryRunner.createForeignKey("User_details", new typeorm_1.TableForeignKey({
                columnNames: ["user_id"],
                referencedTableName: "user",
                referencedColumnNames: ["id"]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('User_details');
        });
    }
}
exports.details1676007493201 = details1676007493201;
