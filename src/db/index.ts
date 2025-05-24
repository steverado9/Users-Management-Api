import { Sequelize } from "sequelize-typescript";
import { config, dialect} from "../config/db.config";
import Users from "../models/user.model";

class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        this.sequelize = new Sequelize({
            database: config.DB,
            username: config.USER,
            password: config.PASSWORD,
            host: config.HOST,
            dialect: dialect,
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            },
            models: [Users]
        });
        try {
            await this.sequelize.authenticate();
            await this.sequelize.sync({force:true});
            console.log("connection has been established successfully.")
        } catch (err) {
            console.error("Unable to connect to the Database:", err)
        }
    }
}

export default Database;
