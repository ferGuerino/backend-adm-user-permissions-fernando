import { Request, Response, NextFunction } from "express";
import { iUserResult } from "../interfaces/users.interface";
import { client } from "../database";
import { AppError } from "../error";
import { QueryConfig } from "pg";

const validateUserEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const requestEmail: string = request.body.email;

  const queryString: string = `
          SELECT
              *
          FROM
              users
          WHERE
              "email" = $1;    
      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [requestEmail],
  };

  const queryResult: iUserResult = await client.query(queryConfig);

  if (queryResult.rowCount !== 0) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default validateUserEmail;
