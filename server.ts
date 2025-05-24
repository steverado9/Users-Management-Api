import express, { Application } from "express";
import dotenv from "dotenv";
import Database from "./src/db/index";

dotenv.config();

const app: Application = express();

const database: Database = new Database();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
console.log();


app.listen(PORT, "localhost", () => {
    console.log(`Server is listening to port ${PORT}.`);
}).on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address alredy in use");
    } else {
        console.log(err);
    };
});