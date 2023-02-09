import { DataSource } from "typeorm";
// import {  category } from "./typeOrm/entity/category";
// import { Product } from "./typeOrm/entity/product";
// import { User } from "./typeOrm/entity/User";
import * as path  from "path";


//console.log(`..\migration\**\*{.ts,.js}`);

const connections =  new DataSource({    
    type: "postgres",
   host: "localhost",
   port: 5432,
   username: "postgres",
   password: "123456",
   database: "postdb",
   synchronize: false, 
   migrationsRun:true,
   //entities:[], 
   logging: false,
   entities: [`${__dirname}/entity/**/*{.ts,.js}`],
   migrations: [`${__dirname}/migration/**/*{.ts,.js}`],
}); 



export default connections