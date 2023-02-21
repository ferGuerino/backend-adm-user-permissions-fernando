import { Router } from "express";
import {
  activateUserControllers,
  createUsersController,
  listUsersController,
  retrieveUserProfileControllers,
  softDeleteUserControllers,
  updateUsersControllers,
} from "../controllers/users.controllers";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import ensureValidateUserData from "../middlewares/ensureValidateData.middleware";
import validateUserId from "../middlewares/ensureUserId.middleware";
import validateUserEmail from "../middlewares/ensureEmailExists.middleware";
import ensureValidToken from "../middlewares/ensureValidToken.middleware";
import ensureUserAdmin from "../middlewares/ensureUserAdmin.middleware";
import ensureAdminforUpdateAndDelete from "../middlewares/ensureAdminForUpdateAndDelete.moddleware";

const userRoutes: Router = Router();

userRoutes.post("", validateUserEmail, ensureValidateUserData(createUserSchema), createUsersController);
userRoutes.get("", ensureValidToken, ensureUserAdmin, listUsersController);
userRoutes.get("/profile", ensureValidToken, retrieveUserProfileControllers);
userRoutes.patch(
  "/:id",
  validateUserId,
  validateUserEmail,
  ensureValidToken,
  ensureAdminforUpdateAndDelete,
  ensureValidateUserData(updateUserSchema),
  updateUsersControllers
);
userRoutes.delete(
  "/:id",
  validateUserId,
  ensureValidToken,
  ensureAdminforUpdateAndDelete,
  softDeleteUserControllers
);
userRoutes.put(
  "/:id/recover",
  validateUserId,
  ensureValidToken,
  ensureUserAdmin,
  activateUserControllers
);

export default userRoutes;
