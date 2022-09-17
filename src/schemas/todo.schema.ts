import * as yup from "yup";

export const addTodoRequestSchema = yup.object().shape({
  text: yup.string().required("Please provide todo"),
  username: yup.string().required("Please provide username"),
  email: yup.string().required("Please provide email").email("Email is not valid"),
});

export const allTodosRequestSchema = yup.object().shape({
  sortBy: yup.string().default("created_at"),
  sortOrder: yup.mixed().oneOf(["asc", "desc"]).default("asc"),
  page: yup.number().default(0),
});

export const editTodoRequestSchema = yup.object().shape({
  id: yup.string().required("Provide id"),
  text: yup.string(),
  statusId: yup.number(),
});
