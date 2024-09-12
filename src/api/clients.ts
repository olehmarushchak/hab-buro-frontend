import { Clients } from "../types/clients.ts";
import { client } from "../utils/client.ts";

export const createNewClient = (newClient: Clients) => {
  return client.post("/clients", newClient);
};
