import { ResponseMessages } from "../constants/messages.constants";
import { addTodoToDb, editTodoFromDb, getTodosFromDb } from "../services/todo.service";
import { Request, Response } from "express";
import { camelCaseKeys } from "../helpers/object.helpers";
import { ITodos } from "../interfaces/todo.interfaces";
import { IResponse, ResponseStatuses } from "../interfaces/response.interfaces";

export const addTodo = async (req: Request, res: Response) => {
  const addTodoResponse = await addTodoToDb(req.body);
  const normalizedResponse = camelCaseKeys(addTodoResponse);

  const addTodoResponseResult =
    addTodoResponse === null
      ? {
          data: null,
          message: ResponseMessages.addTodoError,
          status: ResponseStatuses.Error,
        }
      : {
          data: normalizedResponse,
          message: ResponseMessages.addTodoSuccess,
          status: ResponseStatuses.Success,
        };

  return res.json(addTodoResponseResult);
};

export const editTodo = async (req: Request, res: Response) => {
  const { id, text, statusId } = req.body;

  const editTodoResponse = await editTodoFromDb(id, {
    text,
    statusId,
  });

  const responseResult =
    editTodoResponse !== null
      ? {
          data: editTodoResponse,
          message: ResponseMessages.updateTodoSuccess,
          status: ResponseStatuses.Success,
        }
      : {
          data: null,
          message: ResponseMessages.updateTodoError,
          status: ResponseStatuses.Error,
        };

  return res.json(responseResult);
};

export const getTodos = async (req: Request, res: Response): Promise<Response<IResponse<ITodos | null>>> => {
  const todosResponse = await getTodosFromDb(req.body);

  const responseResult = todosResponse
    ? {
        data: todosResponse,
        message: ResponseMessages.successMessage,
        status: ResponseStatuses.Success,
      }
    : {
        data: null,
        message: ResponseMessages.wentWrong,
        status: ResponseStatuses.Error,
      };

  return res.json(responseResult);
};
