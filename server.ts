import express, { Application } from "express";
import dotenv from "dotenv";
import Database from "./src/db/index";
import Server from "./src/index";
import Routes from "./src/routes";

dotenv.config();

const app: Application = express();

const server: Server = new Server(app);

const routes: Routes = new Routes(app);

const database: Database = new Database();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;


app.listen(PORT, "localhost", () => {
    console.log(`Server is listening to port ${PORT}.`);
}).on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    } else {
        console.log(err);
    };
});