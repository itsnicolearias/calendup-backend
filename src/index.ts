/* eslint-disable no-console */
import { App } from "./app";
import serverless from "serverless-http";
import Database from "./libs/sequelize";

Database.authenticate()
  .then(() => console.log("✅ DB connected"))
  .catch(err => console.error("❌ DB connection error:", err));

const appInstance = new App();
const expressApp = appInstance.getExpressInstance();

export default serverless(expressApp);

if (process.env.NODE_ENV !== "production") {
    appInstance.listen();
}
