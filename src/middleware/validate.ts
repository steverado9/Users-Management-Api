import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

// This function returns middleware that validates req.body
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.format();
      return res.status(400).json({ message: "Validation error", errors });
    }

    // Attach parsed data to req.body (clean and validated)
    req.body = result.data;
    next();
  };
};
