import { loadState } from "@/hooks/utils/load-state";

import request from "../request";

export const fetchProfile = async () => {
  const token = loadState("token");

  const res = await request.get("/users/me?populate=deep", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateProfile = async (id, body) => {
  return await request.put(`/users/${id}`, body);
};
