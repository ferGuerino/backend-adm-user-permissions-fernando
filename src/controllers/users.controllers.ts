import { Request, Response } from "express";
import createUserServices from "../services/users/createUser.services";
import listUsersServices from "../services/users/listUsers.services";
import { iUserRequest, iUserWithoutPassword, iUpdateUserRequest } from "../interfaces/users.interface";
import updateUserServices from "../services/users/updateUser.services";
import { AppError } from "../error";

const createUsersController = async (request: Request, response: Response): Promise<Response> => {
  const userData: iUserRequest = request.body;

  const newUser = await createUserServices(userData);

  return response.status(201).json(newUser);
};

const listUsersController = async (request: Request, response: Response): Promise<Response> => {
  const lisUsers = await listUsersServices();
  return response.json(lisUsers);
};

const updateUsersControllers = async (request: Request, response: Response): Promise<Response> => {
  const userData: iUpdateUserRequest = request.body;
  const userId: number = +request.params.id;

  const updatedUser = await updateUserServices(userData, userId);
  return response.json(updatedUser);
};

export { createUsersController, listUsersController, updateUsersControllers };
