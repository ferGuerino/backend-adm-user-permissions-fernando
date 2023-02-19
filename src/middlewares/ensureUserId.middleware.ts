import { Request, Response, NextFunction } from "express";
import { iUserResult } from "../interfaces/users.interface";
import { client } from "../database";
import { AppError } from "../error";
import { QueryConfig } from "pg";

const validateUserId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const requestId: number = +request.params.id;

  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            "id" = $1;    
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [requestId],
  };

  const queryResult: iUserResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default validateUserId;
