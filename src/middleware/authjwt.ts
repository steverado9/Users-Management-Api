import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { Jwt } from "jsonwebtoken";
import config from "../config/auth.config";
import User from "../models/user.model";
import Role from "../models/role.model";
import handleResponse from "../response/handleResponse";

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = await req.headers["x-acces-token"];

    if (!token) {
        return handleResponse(res, 403, "No token provided!");
    }

    Jwt.verify(token, config.secret, (err: any, decoded: any) => {
       if (err) {
         handleResponse(res, 401, "Unauthorized!");
       }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const findById = await User.findByPk(req.userId);
    const roles = User.getRoles();
    for (const role of roles) {
        if (role.name === "admin") {
            next();
            return;
        }
    }
    handleResponse(res, 403, "Require admin Role!");
    return;
};

const isModerator = (req: Request, res: Response, next: NextFunction) => {
    const findById = User.findByPk(req.userId);
    const roles = user.getRoles();
    for (const role of roles) {
        if (role.name === "moderator") {
            next();
            return;
        }
    }
    handleResponse(res, 403, "Require Moderator Role!");
    return;
}

const isModeratorOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const findById = User.findByPk(req.userId);
    const roles = userInfo.getRoles();
    for (const role of roles) {
        if (role.name === "moderator") {
            next();
            return;
        }
        if (role.name === "admin") {
            next();
            return;
        }
    }
    handleResponse(res, 403, "Require Moderator or Admin Role!");
}

const authjwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

export default authjwt;

