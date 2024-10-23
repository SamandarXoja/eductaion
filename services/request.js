import axios from "axios";

import { toast } from "@/components/ui/use-toast";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const request = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.method !== "get") {
      toast({
        variant: "destructive",
        title: error?.response?.data?.error?.message,
      });
    }

    return Promise.reject(error);
  },
);

export default request;
