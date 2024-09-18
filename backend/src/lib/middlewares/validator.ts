import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    });
  }else{
      next();
  }
}