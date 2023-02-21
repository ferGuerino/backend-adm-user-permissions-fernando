import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import { AppError } from "../error";
import { client } from "../database";
import { iRequestTokenData } from "../interfaces/users.interface";

const ensureAdminforUpdateAndDelete = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId: number = +request.params.id;
  const tokenData = request.user;
  const queryStringRetrieveUser: string = `
        SELECT
            *
        FROM
            users
        WHERE
            "id" = $1
    `;
  const queryConfigRetrieveUser: QueryConfig = {
    text: queryStringRetrieveUser,
    values: [userId],
  };
  const queryResultRetrieveUser = await client.query(queryConfigRetrieveUser);

  if (tokenData.admin === false) {
    if (tokenData.id !== userId) {
      throw new AppError("Insufficient Permission", 403);
    }
    return next();
  }

  return next();
};

export default ensureAdminforUpdateAndDelete;
