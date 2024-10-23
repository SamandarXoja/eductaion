import { loadState } from "@/hooks/utils/load-state";

import request from "../request";

export const pay = async (body) => {
  const token = loadState("token");

  return await request.post("/payments", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
