import { App } from "./app"
import serverless from "serverless-http"

const app = new App()
export const handler = serverless(app.getExpressInstance());

if (process.env.NODE_ENV !== "production") {
  app.listen()
};

export default app;
