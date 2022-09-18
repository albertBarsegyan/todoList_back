export enum TodoSortOrders {
  Asc = "asc",
  Desc = "desc",
}

export enum TodoStatusVariants {
  inProgress = 0,
  done = 1,
}

export const enum TodoSortVariants {
  Username = "username",
  Email = "email",
  Status = "status_id",
  CreatedAt = "created_at",
}

export interface ITodoRequest {
  sortBy: TodoSortVariants;
  sortOrder: TodoSortOrders;
  page: number;
}

export interface ITodo {
  id: number;
  createdAt: string;
  username: string;
  email: string;
  text: string;
  isEdited: number;
  statusId: number;
}

export interface IAddTodoResponse {
  data: ITodo[];
  allPages: number;
}

export interface ITodos extends IAddTodoResponse {
  page: number;
  sortOrder: TodoSortOrders;
  sortBy: TodoSortVariants;
}
