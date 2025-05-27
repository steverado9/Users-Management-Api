import { Request, Response } from "express";
import User from "../models/user.model";
import userRepository from "../repositories/user.repository";
import handleResponse from "../response/handleResponse";

export default class UserController {
    async create(req: Request, res: Response) {
        const user: User = req.body;
        const { username, email } = user;
        if (!username || !email) {
            return handleResponse(res, 404, "username and email are required");
        }
        try {
            await userRepository.save(user);
            handleResponse(res, 201, "user created successfully", user);
        } catch (err) {
            handleResponse(res, 500, "Internal Server Error");
        }
    }

    async findAll(req: Request, res: Response) {
        const username = typeof req.query.username === "string" ? req.query.username : "";
        try {
            //get the data from the database and diplay it in the reqBody
            const users = await userRepository.retrieveAll({ username });
            handleResponse(res, 200, "users fetched sucessfully", users);
        } catch (err) {
            handleResponse(res, 500, "Internal Server Error!");
        }
    }

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const user = await userRepository.retrieveById(id);
            if (!user) {
                return handleResponse(res, 404, `Failed to retrieve user! with id: ${id}`);
            }
            handleResponse(res, 200, `user with id: ${id} fetched successfully`, user);
        } catch (err) {
            handleResponse(res, 500, "Internal server Error!");
        }
    }

    async update(req: Request, res: Response) {
        const user: User = req.body;
        user.id = parseInt(req.params.id);
        try {
            const updateUser = await userRepository.update(user);
            if (updateUser === 1) {
                return handleResponse(res, 200, `updated user with ${user.id} successfully`);
            } else {
                throw new Error(`Cannot update user with id=${user.id}`);
            }

        } catch (err) {
            handleResponse(res, 500, "Internal server Error!");
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        try {
            const num = await userRepository.delete(id);
            if (num === 1) {
                return handleResponse(res, 200, `deleted user with id ${id}`);
            } else {
                throw new Error(`Cannot delete User with id=${id}`);
            }
        } catch (err) {
            handleResponse(res, 500, "Internal Server Error!");
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await userRepository.deleteAll();
            handleResponse(res, 200, `${num} Users were deleted successfully!`);
        } catch (err) {
            handleResponse(res, 500, "Some error occurred while removing all Users.");
        }
    }
}