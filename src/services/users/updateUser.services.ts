import {
  iUpdateUserRequest,
  iUpdateUserResult,
  iUpdateUserWithoutPassword,
} from "../../interfaces/users.interface";
import format from "pg-format";
import { client } from "../../database";
import { QueryConfig } from "pg";
import { returnUpdateUserSchemaWithoutPassword } from "../../schemas/users.schemas";
import { AppError } from "../../error";

const updateUserServices = async (
  userData: iUpdateUserRequest,
  userId: number
): Promise<iUpdateUserWithoutPassword | any> => {
  if (Object.keys(userData).length === 0) {
    throw new AppError("One of keys (name,email,password) is required", 400);
  }
  const queryString: string = format(
    `
    UPDATE
        users
    SET 
        (%I) = ROW(%L)
    WHERE
        "id" = $1
    RETURNING*;
`,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: iUpdateUserResult = await client.query(queryConfig);

  const updatedUser = returnUpdateUserSchemaWithoutPassword.parse(queryResult.rows[0]);
  return updatedUser;
};

export default updateUserServices;
