import { loadState } from "@/hooks/utils/load-state";

import request from "../request";

export const register = async (body) => {
  return await request.post("/auth/local/register", body);
};

export const login = async (body) => {
  return await request.post("/auth/local", body);
};

export const loginWithSso = async (body) => {
  const token = loadState("token");

  return await request.post("/sso/saml/login", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ssoRequest = async (url, body) => {
  return await request.post(url, body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const sendEmail = async (body) => {
  return await request.post("/auth/forgot-password", body);
};

export const resetPassword = async (body) => {
  return await request.post("/auth/reset-password", body);
};

export const changePassword = async (body) => {
  const token = loadState("token");

  return await request.post("/auth/change-password", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const emailConfirmation = async (confirmationCode) => {
  return await request.get(
    `/auth/email-confirmation?confirmation=${confirmationCode}`,
  );
};

export const sendEmailConfirmation = async (body) => {
  return await request.post("/auth/send-email-confirmation", body);
};
