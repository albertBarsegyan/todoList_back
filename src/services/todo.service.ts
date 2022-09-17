import { prisma } from "../configs/prismaClient";
import { isEmpty } from "lodash";
import {
  ITodo,
  ITodoRequest,
  ITodos,
  TodoSortOrders,
  TodoSortVariants,
  TodoStatusVariants,
} from "../interfaces/todo.interfaces";
import { camelCaseKeys } from "../helpers/object.helpers";
import { IResponse } from "../interfaces/response.interfaces";

interface TodoCreateDataType {
  text: string;
  email: string;
  username: string;
}

export const addTodoToDb = async (todoCreateData: TodoCreateDataType) => {
  let addResponse;

  try {
    addResponse = await prisma.todos.create({
      data: { status_id: TodoStatusVariants.inProgress, is_edited: 0, ...todoCreateData },
    });
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

const TodosLimit = 3;
const TodosRequestDefaultData = {
  page: 0,
  sortBy: TodoSortVariants.Status,
  sortOrder: TodoSortOrders.Asc,
};
const todosCount = prisma.todos.count();

export const getTodosFromDb = async (todoRequestData?: ITodoRequest): Promise<ITodos | null> => {
  const { page, sortBy, sortOrder } = isEmpty(todoRequestData)
    ? TodosRequestDefaultData
    : { ...TodosRequestDefaultData, ...todoRequestData };

  let todosFromDb;
  let todosResponse;
  const skip = page * TodosLimit;
  const allPages = Math.ceil((await todosCount) / TodosLimit);

  try {
    todosFromDb = await prisma.todos.findMany({
      skip,
      take: TodosLimit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    todosResponse = { list: camelCaseKeys(todosFromDb), page, allPages, sortBy, sortOrder };
  } catch (e) {
    todosResponse = null;
  }

  return todosResponse;
};
