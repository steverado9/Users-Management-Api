import { Request , Response} from "express";

export const welcome = (req: Request, res: Response): void => {
    res.json({ message: "Welcome stephen!" });
}