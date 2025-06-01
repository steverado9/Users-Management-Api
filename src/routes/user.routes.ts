import { Router } from "express";
import UserController from "../controllers/user.controller";
import { verifySignUp } from "../middleware/verifyUsernameAndEmail";
import { controller } from "../controllers/auth.controller";

class UserRoutes {
    router = Router();
    usercontroller = new UserController();
    controller = controller;

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRoleExisted], this.controller.signup);
        
        this.router.post("/signin", this.controller.signin);

        // //create a new user
        this.router.post("/", verifySignUp.checkDuplicateUsernameOrEmail, this.usercontroller.create);

        // //Retrieve all users
        this.router.get("/", this.usercontroller.findAll);

        // //Retrieve a single user with id
        this.router.get("/:id", this.usercontroller.findOne);

        // //update a user with id
        this.router.put("/:id", this.usercontroller.update);

        // //Delete a user with id
        this.router.delete("/:id", this.usercontroller.delete);
    }
}

export default new UserRoutes().router;
