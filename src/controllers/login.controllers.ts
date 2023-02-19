import { Request, Response } from "express";
import createLoginService from "../services/login/createLogin.services";

const createLoginController = async (request: Request, reaponse: Response): Promise<Response> => {
  const token = await createLoginService(request.body);

  return reaponse.json({
    token: token,
  });
};

export default createLoginController;
