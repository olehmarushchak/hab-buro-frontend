import { Reqruit } from "../types/reqruit.ts";
import { client } from "../utils/client.ts";

export const createNewReqruit = (newReqruit: Reqruit) => {
    return client.post("/recruits", newReqruit);
  };
  