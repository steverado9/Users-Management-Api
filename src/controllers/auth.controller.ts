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
    // Create new user with hashed password
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    // Handle role assignment
    const roles = req.body.roles;
    if (roles && Array.isArray(roles)) {
      const foundRoles = await Role.findAll({
        where: { name: { [Op.or]: roles } },
      });
      await user.$set("roles", foundRoles); // Associate roles
    } else {
      await user.$set("roles", [1]); // Default to role ID 1
    }

    handleResponse(res, 200, "User was registered successfully");
  } catch (err) {
    console.error("Signup error:", err);
    handleResponse(res, 500, "Internal server error");
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    // Find user and include roles in the same query
    const user = await User.findOne({
      where: { username: req.body.username },
      include: [Role], // 👈 Eager load roles
    });

    if (!user) {
      return handleResponse(res, 404, "User not found");
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return handleResponse(res, 401, "Invalid password!");
    }

    const token = Jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    const authorities: string[] = [];
    const roles = user.roles as Role[]; //  Type assertion
    if (roles && Array.isArray(roles)) {
      for (const role of roles) {
        authorities.push("ROLE_" + role.name.toUpperCase());
      }
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    handleResponse(res, 500, "Internal server error!");
  }
};


export const controller = { signup, signin };