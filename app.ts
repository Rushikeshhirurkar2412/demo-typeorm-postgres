import express from "express";
 import * as dotenv from "dotenv"
import bodyParser from "body-parser";
import connections from "./src/my-app-data-source";
import { route } from "./src/route/userRoute";
import Productroute from "./src/route/productRoute";

let port = process.env.PORT || 4501;

dotenv.config()
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//database connection
(async () => {
  try {
    const db = await connections.initialize();

    if (db) {
      console.log(
        `⚡️ server started with 👍🏼 database connected http://localhost:${port} in `
      );

      app.listen(port, (): void => {
        console.log(
          `⚡️ server started with 👍🏼 database connected http://localhost:${port} in `
        );
      });
    }
  } catch (error) {
    console.log(`👎🏻 database or redis connection has some problem : ${error}`);
  }
})();

// this is middleware for CRUD
app.use("/", route);
app.use("/", Productroute);


// url: process.env.DATABASE_URL,
