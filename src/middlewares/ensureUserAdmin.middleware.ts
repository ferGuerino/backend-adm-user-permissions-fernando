import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

const ensureUserAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const tokenData = request.user;

  if (!tokenData.admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default ensureUserAdmin;
