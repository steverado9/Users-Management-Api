import { Request, Response } from "express";
import User from "../models/user.model";
import userRepository from "../repositories/user.repository";

export default class UserController {
     async create(req: Request, res: Response) {
        try {
            // give the repo our data
            const user: User = req.body;
            userRepository.save(user);

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
        try {
            res.status(200).json({
                message: "findAll Ok"
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "findOne Ok",
                reqParamId: req.params.id
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal server Error!"
            })
        }
    }

     async update(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "update Ok",
                reqParamId: req.params.id,
                reqBody: req.body
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal server Error!"
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: "delete OK",
                reqParamId: req.params.id
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

}