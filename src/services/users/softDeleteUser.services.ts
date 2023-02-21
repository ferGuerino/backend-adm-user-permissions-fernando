import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";

const softDeleteUserServices = async (userId: number): Promise<void> => {
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

  if (!queryResultRetrieveUser.rows[0].active) {
    throw new AppError("User already inactive", 400);
  }

  const queryString: string = `
        UPDATE
            users
        SET
            "active" = false
        WHERE
            "id" = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };
  await client.query(queryConfig);
};

export default softDeleteUserServices;
