"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
console.log(`${__dirname}/migration/**/*{.ts,.js}`);
const connections = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "postdb",
    synchronize: false,
    migrationsRun: true,
    //entities:[], 
    logging: false,
    //migrations:['./migration/1675857514392-product.ts'],
    entities: [`${__dirname}\entity\**\*{.ts,.js}`],
    migrations: [`${__dirname}\migration\**\*{.ts,.js}`],
});
exports.default = connections;
