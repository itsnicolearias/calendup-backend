import { App } from "./app";
import express  from "express";
import cors from 'cors';
import indexRoutes from "./routes/index.routes";

async function main() {
    const app2 = new App();
    await app2.listen()

}

main();


const app = express();
app.use(express.json());
app.use(cors());
app.get('/api/health', (_req, res) => res.send("ok"));
app.use('/api', indexRoutes);

export default app;
