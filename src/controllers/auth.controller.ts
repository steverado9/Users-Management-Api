import User from "../models/user.model";
import Role from "../models/role.model";
import config from "../config/auth.config";
import { Op } from "sequelize";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import handleResponse from "../response/handleResponse";

const signup = async (req: Request, res: Response) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        if (req.body.roles) {
            const roles = await Role.findAll({ where: { name: { [Op.or]: req.body.roles } } });
            await user.setRoles(roles);
            handleResponse(res, 200, "User was register sucessfully");
            return;
        } else {
            await user.setRoles([1]);
            handleResponse(res, 200, "User was register sucessfully");
            return;
        }
    } catch (err) {
        handleResponse(res, 500, "internal server error");
    }
}

const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return handleResponse(res, 404, "user not found");
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return handleResponse(res, 401, "Invalid password!");
        }
        // Create JWT token with user ID, signed with secret, expires in 24 hours
        const token = Jwt.sign({ id: user.id }, config.secret, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 86400,
        });
        const authorities = [];
        const roles = await user.getRoles();
        for (const role of roles) {
            authorities.push("ROLE_" + role.name.toUpperCase());
        }
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (err) {
        handleResponse(res, 500, "Internal server error!");
    }
}

export const controller = { signup, signin };