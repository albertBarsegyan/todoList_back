import { prisma } from "../configs/prismaClient";
import { isEmpty } from "lodash";
import {
  IAddTodoResponse,
  ITodo,
  ITodoRequest,
  ITodos,
  TodoSortOrders,
  TodoSortVariants,
  TodoStatusVariants,
} from "../interfaces/todo.interfaces";
import { camelCaseKeys } from "../helpers/object.helpers";
import { IResponse } from "../interfaces/response.interfaces";
import { TodoConstants } from "../constants/todo.contants";

interface TodoCreateDataType {
  text: string;
  email: string;
  username: string;
}

const getTodosPageCount = async () => {
  const todosCount = await prisma.todos.count();

  const allPages = Math.ceil(todosCount / TodoConstants.PerPageLimit);
  return { allPages, todosCount };
};

export const addTodoToDb = async (todoCreateData: TodoCreateDataType): Promise<IAddTodoResponse | null> => {
  let addResponse = { data: null, allPages: 0 };

  try {
    addResponse.data = await prisma.todos.create({
      data: { status_id: TodoStatusVariants.inProgress, is_edited: 0, ...todoCreateData },
    });
    const { allPages } = await getTodosPageCount();

    addResponse.allPages = allPages;
  } catch (e) {
    addResponse = null;
  }

  return addResponse;
};

const getUpdatedFields = (
  text?: string,
  statusId?: number
): { status_id?: number; text?: string; is_edited?: number } => {
  const statusIdNumber = Number(statusId);
  if (text && statusId) {
    return {
      text,
      status_id: statusIdNumber,
    };
  }

  return text ? { text, is_edited: 1 } : { status_id: statusIdNumber };
};

export const editTodoFromDb = async (
  todoId: number,
  { text, statusId }: { text: string; statusId: number }
): Promise<IResponse<ITodo>> => {
  let updateResponse;

  try {
    updateResponse = await prisma.todos.update({
      where: {
        id: todoId,
      },
      data: { ...getUpdatedFields(text, statusId) },
    });

    updateResponse = camelCaseKeys(updateResponse);
  } catch (e) {
    updateResponse = null;
  }

  return updateResponse;
};

const TodosRequestDefaultData = {
  page: 0,
  sortBy: TodoSortVariants.Status,
  sortOrder: TodoSortOrders.Asc,
};

export const getTodosFromDb = async (todoRequestData?: ITodoRequest): Promise<ITodos | null> => {
  const { allPages } = await getTodosPageCount();
  const { page, sortBy, sortOrder } = isEmpty(todoRequestData)
    ? TodosRequestDefaultData
    : { ...TodosRequestDefaultData, ...todoRequestData };

  let todosFromDb;
  let todosResponse;
  const skip = page * TodoConstants.PerPageLimit;

  try {
    todosFromDb = await prisma.todos.findMany({
      skip,
      take: TodoConstants.PerPageLimit,
      orderBy: [{ [sortBy]: sortOrder }, { created_at: sortOrder }],
    });

    todosResponse = { list: camelCaseKeys(todosFromDb), page, allPages, sortBy, sortOrder };
  } catch (e) {
    todosResponse = null;
  }

  return todosResponse;
};
