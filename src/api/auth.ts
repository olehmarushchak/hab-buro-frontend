import { Auth } from "../types/auth.ts";
import { client } from "../utils/client.ts";

export const loginFetch = (login, password) => {
  return client.post<Auth>("/login", { login, password });
};
