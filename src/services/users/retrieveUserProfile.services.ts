import { QueryConfig } from "pg";
import { client } from "../../database";
import { iRequestTokenData, iUserWithoutPassword } from "../../interfaces/users.interface";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const retrieveUserProfileServices = async (
  tokenData: iRequestTokenData
): Promise<iUserWithoutPassword> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            "id" = $1
    `;
  const queryconfig: QueryConfig = {
    text: queryString,
    values: [tokenData.id],
  };
  const queryResult = await client.query(queryconfig);

  const returnUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

  return returnUser;
};

export default retrieveUserProfileServices;
