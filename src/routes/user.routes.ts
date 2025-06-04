import { Router } from "express";
import UserController from "../controllers/user.controller";
import verifySignUp  from "../middleware/verifyUsernameAndEmail";
import { validate } from "../middleware/validate";
import { signupSchema, signinSchema, updateUserSchema } from "../validation/user.validation";

class UserRoutes {
    router = Router();
    usercontroller = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        //create a new user
        this.router.post("/", [
            validate(signupSchema),
            verifySignUp.checkDuplicateUsernameOrEmail, 
            verifySignUp.checkValidRole
        ], this.usercontroller.signup);
        
         // //Retrieve all users
        this.router.get("/", this.usercontroller.findAll);

        //signin a single user 
        this.router.post("/signin", validate(signinSchema), this.usercontroller.signin);

        // //update a user with id
        this.router.put("/:id", validate(updateUserSchema), this.usercontroller.update);

        // //Delete a user with id
        this.router.delete("/:id", this.usercontroller.deleteUser);
    }
}

export default new UserRoutes().router;
