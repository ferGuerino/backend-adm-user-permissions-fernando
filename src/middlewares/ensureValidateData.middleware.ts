import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureValidateUserData =
  (schema: ZodTypeAny) => (request: Request, response: Response, next: NextFunction) => {
    const validateData = schema.parse(request.body);

    request.body = validateData;

    return next();
  };

export default ensureValidateUserData;
