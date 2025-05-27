import { Application } from "express";
import homeRoutes from "./home.routes";
import userRoutes from "./user.routes";
import { Request, Response, NextFunction } from "express";

export default class Routes {
    constructor(app: Application) {
        app.use((req: Request, res: Response, next: NextFunction) => {
            res.header(
                "Access-Control-Allow-Headers",
                "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        });
        app.use("/api", homeRoutes);
        app.use("/api/users", userRoutes);
    }
}