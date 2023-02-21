import { Request, Response } from "express";
import createUserServices from "../services/users/createUser.services";
import listUsersServices from "../services/users/listUsers.services";
import retrieveUserProfileServices from "../services/users/retrieveUserProfile.services";
import softDeleteUserServices from "../services/users/softDeleteUser.services";
import activateUserServices from "../services/users/activateUser.services";
import {
  iUserRequest,
  iUserWithoutPassword,
  iUpdateUserRequest,
  iRequestTokenData,
} from "../interfaces/users.interface";
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

const retrieveUserProfileControllers = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestData = request.user;
  const userProfile = await retrieveUserProfileServices(requestData);

  return response.json(userProfile);
};

const softDeleteUserControllers = async (request: Request, response: Response): Promise<Response> => {
  const userId: number = +request.params.id;

  await softDeleteUserServices(userId);
  return response.status(204).json();
};

const activateUserControllers = async (request: Request, response: Response): Promise<Response> => {
  const requestId: number = +request.params.id;
  const isUserAdmin = request.user;

  const activateUser = await activateUserServices(requestId, isUserAdmin);
  return response.json(activateUser);
};

export {
  createUsersController,
  listUsersController,
  updateUsersControllers,
  retrieveUserProfileControllers,
  softDeleteUserControllers,
  activateUserControllers,
};
