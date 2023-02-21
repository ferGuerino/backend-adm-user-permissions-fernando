import { iUserRequest, iUserResult, iUserWithoutPassword } from "../../interfaces/users.interface";
import format from "pg-format";
import { client } from "../../database";

import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const createUserServices = async (userData: iUserRequest): Promise<iUserWithoutPassword> => {
  const queryString: string = format(
    `
        INSERT INTO
            users(%I)
        VALUES 
            (%L)
        RETURNING *;
    
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: iUserResult = await client.query(queryString);

  const createdUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

  return createdUser;
};

export default createUserServices;
