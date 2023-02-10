import { DataSource } from "typeorm";
import * as path  from "path";
import { Product } from "./entities/product";
import { User } from "./entities/user";


//console.log(`..\migration\**\*{.ts,.js}`);

const connections =  new DataSource({    
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



export default connections