import { addTodo, removeTodo, editTodo, getTodos } from "../controllers/todoController";
import { RoutePaths } from "../constants/route.constants";

import { Router } from "express";
import { validate } from "../middlewares/validator.middleware";
import { addTodoRequestSchema, allTodosRequestSchema, editTodoRequestSchema } from "../schemas/todo.schema";

const todoRoutes = Router();

todoRoutes.post(RoutePaths.all(), validate(allTodosRequestSchema), getTodos);
todoRoutes.post(RoutePaths.main(), validate(addTodoRequestSchema), addTodo);
todoRoutes.patch(RoutePaths.main(), validate(editTodoRequestSchema), editTodo);
todoRoutes.delete(RoutePaths.main(), removeTodo);

export default todoRoutes;
