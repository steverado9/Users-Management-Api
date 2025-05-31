import { Request, Response, NextFunction } from "express";
import handleResponse from "../response/handleResponse";
import User from "../models/user.model";
import Role from "../models/role.model";


const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, email } = req.body;
        // check if username exist
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            handleResponse(res, 400, "Failed! Username is already in use!");
            return;
        }
        // Check if email exists
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            handleResponse(res, 400, "Failed! Email is already in use!");
            return;
        }

        next(); // If no duplicates, proceed to the next middleware/controller
    } catch (err) {
        handleResponse(res, 500, "Internal server error.");
        return;
    }

}

const checkRoleExisted = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const roles = req.body.roles;
        const role: Role[] = [];
        if (req.body.roles) {
            for (const element of roles) {
                if (role.includes(element)) {
                    handleResponse(res, 500, "Failed! Role does not exist = " + element);
                    return;
                }
            }
        }
        next();
    } catch (err) {
        handleResponse(res, 500, "Internal server error.");
        return;
    }
}

export const verifySignUp =  { 
    checkDuplicateUsernameOrEmail,
    checkRoleExisted
    };