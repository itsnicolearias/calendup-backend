import { App } from "./app"
import serverless from "serverless-http"

const app = new App()
const expressApp = app.getExpressInstance()

export default serverless(expressApp)

if (process.env.NODE_ENV !== "production") {
  app.listen()
};
