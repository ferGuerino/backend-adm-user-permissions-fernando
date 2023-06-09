import { Router } from "express";
import createLoginController from "../controllers/login.controllers";
import ensureValidateUserData from "../middlewares/ensureValidateData.middleware";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post("", ensureValidateUserData(createLoginSchema), createLoginController);

export default loginRoutes;
