import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { Jwt } from "jsonwebtoken";
import config from "../config/auth.config";
import User from "../models/user.model";
import Role from "../models/role.model";
import handleResponse from "../response/handleResponse";

const verifyTaoken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token = await req.headers["x-acces-token"];

    if (!token) {
        return handleResponse(res, 403, "No token provided!");
    }

    Jwt.verify(token, config.secret, (err: ErrorRequestHandler, decoded: any) => {
        handleResponse(res, 403, "No token provided!");

    }
    )
}

