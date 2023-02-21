import { QueryResult } from "pg";
import { z } from "zod";
import {
  createUserSchema,
  returnUserSchema,
  returnUserSchemaWithoutPassword,
  listUsersSchema,
  updateUserSchema,
  returnUpdateUserSchema,
  returnUpdateUserSchemaWithoutPassword,
} from "../schemas/users.schemas";

type iUserRequest = z.infer<typeof createUserSchema>;
type iUser = z.infer<typeof returnUserSchema>;
type iUserWithoutPassword = z.infer<typeof returnUserSchemaWithoutPassword>;
type iUserResult = QueryResult<iUserWithoutPassword>;
type iUserResultWithPass = QueryResult<iUser>;

type iUpdateUserRequest = z.infer<typeof updateUserSchema>;
type iUpdateUser = z.infer<typeof returnUpdateUserSchema>;
type iUpdateUserWithoutPassword = z.infer<typeof returnUpdateUserSchemaWithoutPassword>;
type iUpdateUserResult = QueryResult<iUpdateUserWithoutPassword>;
type iUpdateUserResultWithPass = QueryResult<iUpdateUser>;

type iListUsers = z.infer<typeof listUsersSchema>;

interface iRequestTokenData {
  id: number;
  admin: boolean;
}

export {
  iUserRequest,
  iUser,
  iUserWithoutPassword,
  iUserResult,
  iListUsers,
  iUserResultWithPass,
  iUpdateUserRequest,
  iUpdateUser,
  iUpdateUserWithoutPassword,
  iUpdateUserResult,
  iUpdateUserResultWithPass,
  iRequestTokenData,
};
