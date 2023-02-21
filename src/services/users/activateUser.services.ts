import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import {
  iRequestTokenData,
  iUser,
  iUserResult,
  iUserWithoutPassword,
} from "../../interfaces/users.interface";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const activateUserServices = async (
  userId: number,
  tokenData: iRequestTokenData
): Promise<iUserWithoutPassword> => {
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

  if (queryResultRetrieveUser.rows[0].active) {
    throw new AppError("User already active", 400);
  }

  const queryString: string = `
    UPDATE
      users
    SET 
      "active" = 'true'
    WHERE
      "id" = $1
    RETURNING*;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: iUserResult = await client.query(queryConfig);

  const returnUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

  return returnUser;
};
export default activateUserServices;
