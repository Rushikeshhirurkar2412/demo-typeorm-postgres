"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
//console.log(`..\migration\**\*{.ts,.js}`);
const connections = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "postdb",
    synchronize: false,
    logging: false,
    //    entities:[Product,User],
    entities: [`${__dirname}/entities/**/*{.ts,.js}`],
    migrations: [`${__dirname}/migration/**/*{.ts,.js}`],
});
exports.default = connections;
