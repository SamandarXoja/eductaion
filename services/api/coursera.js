import { loadState } from "@/hooks/utils/load-state";

import request from "../request";

export const fetchUserCourses = async (externalId) => {
  const token = loadState("token");

  const res = await request.get(`/coursera/member-progress/${externalId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchCourseFilters = async () => {
  const res = await request.get("/coursera-content-filter");
  return res.data?.data?.attributes?.filter;
};

export const fetchCourses = async ({ page, pageSize, ...body }) => {
  const res = await request.post(
    `/coursera-contents/filter?page=${page}&pageSize=${pageSize}`,
    body,
  );

  return res.data;
};
