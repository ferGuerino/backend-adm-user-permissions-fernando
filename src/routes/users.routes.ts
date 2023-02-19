import { Router } from "express";
import {
  createUsersController,
  listUsersController,
  updateUsersControllers,
} from "../controllers/users.controllers";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import ensureValidateUserData from "../middlewares/ensureValidateData.middleware";
import validateUserId from "../middlewares/ensureUserId.middleware";
import validateUserEmail from "../middlewares/ensureEmailExists.middleware";
import ensureValidToken from "../middlewares/ensureValidToken.middleware";
import ensureUserAdmin from "../middlewares/ensureUserAdmin.middleware";

const userRoutes: Router = Router();

userRoutes.post("", validateUserEmail, ensureValidateUserData(createUserSchema), createUsersController);
userRoutes.get("", ensureValidToken, ensureUserAdmin, listUsersController);
userRoutes.get("/profile", ensureValidToken);
userRoutes.patch(
  "/:id",
  validateUserId,
  validateUserEmail,
  ensureValidateUserData(updateUserSchema),
  updateUsersControllers
);
userRoutes.delete("/:id", validateUserId, ensureValidToken, ensureUserAdmin);
userRoutes.put("/:id/recover");

export default userRoutes;
