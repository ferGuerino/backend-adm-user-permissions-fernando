import { iListUsers } from "../../interfaces/users.interface";
import { client } from "../../database";
import { listUsersSchema } from "../../schemas/users.schemas";

const listUsersServices = async (): Promise<iListUsers> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users;
    `;

  const queryResult = await client.query(queryString);

  const returnUsers = listUsersSchema.parse(queryResult.rows);

  return returnUsers;
};

export default listUsersServices;
