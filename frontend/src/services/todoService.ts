import { api } from "./api";
import { Todo } from "../types/todo";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await api.get("/");
  return res.data;
};

export const createTodo = async (data: { title: string }): Promise<Todo> => {
  const res = await api.post("/", data);
  return res.data;
};

export const deleteTodo = async (id: number) => {
  await api.delete(`/${id}`);
};