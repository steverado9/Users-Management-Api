import { Router } from "express";
import UserController from "../controllers/user.controller";
import verifySignUp  from "../middleware/verifyUsernameAndEmail";

class UserRoutes {
    router = Router();
    usercontroller = new UserController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        //create a new user
        this.router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRoleExisted], this.usercontroller.signup);
        
         // //Retrieve all users
        this.router.get("/", this.usercontroller.findAll);

        //signin a single user 
        this.router.post("/signin", this.usercontroller.signin);

        // //update a user with id
        this.router.put("/:id", this.usercontroller.update);

        // //Delete a user with id
        this.router.delete("/:id", this.usercontroller.deleteUser);
    }
}

export default new UserRoutes().router;
