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
exports.userSession1676462890653 = void 0;
const typeorm_1 = require("typeorm");
class userSession1676462890653 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "user_session",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: "token",
                        type: "varChar",
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "is_expired",
                        type: "boolean",
                    },
                    {
                        name: "created_at",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "deleted_at",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })), true;
            yield queryRunner.createForeignKey("user_session", new typeorm_1.TableForeignKey({
                columnNames: ["user_id"],
                referencedTableName: 'user',
                referencedColumnNames: ["id"]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            queryRunner.dropTable("user_session");
        });
    }
}
exports.userSession1676462890653 = userSession1676462890653;
