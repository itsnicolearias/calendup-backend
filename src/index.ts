import { App } from "./app";

export async function main() {
    const app = new App();
    await app.listen()
}

main();