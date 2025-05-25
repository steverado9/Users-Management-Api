import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
    router = Router();
    controller = new UserController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        // //create a new Tutorial
        this.router.post("/", this.controller.create);

        // //Retrieve all Tutorials
        this.router.get("/", this.controller.findAll);

        // //Retrieve a single Tutorial with id
        this.router.get("/:id", this.controller.findOne);

        // //update a Tutorial with id
        this.router.put("/:id", this.controller.update);

        // //Delete a Tutorial with id
        this.router.delete("/:id", this.controller.delete);
    }
}

export default new UserRoutes().router;
