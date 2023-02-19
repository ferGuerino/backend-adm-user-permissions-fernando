import { iUserResult, iUserWithoutPassword, iListUsers } from "../../interfaces/users.interface";
import { client } from "../../database";

const listUsersServices = async (): Promise<iListUsers> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users;
    `;

  const queryResult = await client.query(queryString);

  return queryResult.rows;
};

export default listUsersServices;
