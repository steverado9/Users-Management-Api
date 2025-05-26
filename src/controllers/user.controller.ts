import { Request, Response } from "express";
import User from "../models/user.model";
import userRepository from "../repositories/user.repository";

export default class UserController {
    async create(req: Request, res: Response) {
        try {
            // give the repo our data
            console.log("req.body", req.body);
            const user: User = req.body;
            await userRepository.save(user);

            res.status(201).json({
                message: "create OK",
                reqBody: req.body
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }

    async findAll(req: Request, res: Response) {
        const username = typeof req.query.username === "string" ? req.query.username : "";
        try {
            //get the data from the database and diplay it in the reqBody
            const users = await userRepository.retrieveAll({ username });
            console.log("users", users);

            res.status(200).json({
                message: "findAll Ok",
                reqBody: users
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        console.log("id", id);
        try {
            const user = await userRepository.retrieveById(id);
            console.log("user", user);

            res.status(200).json({
                message: "findOne Ok",
                reqBody: user
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal server Error!"
            })
        }
    }

    async update(req: Request, res: Response) {
        const user: User = req.body;
        user.id = parseInt(req.params.id);
        try {
            const updateUser = await userRepository.update(user);
            if (updateUser === 1) {
                res.status(200).json({
                    message: "update Ok",
                });

            } else {
                throw new Error(`Cannot update Tutorial with id=${user.id}`);
            }

        } catch (err) {
            res.status(500).json({
                message: "Internal server Error!"
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        try {
            const num = await userRepository.delete(id);
            if (num === 1) {
                res.status(200).json({
                    message: "delete OK",
                    reqParamId: req.params.id
                });

            } else {
                throw new Error(`Cannot delete Tutorial with id=${id}`);
            }
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

}