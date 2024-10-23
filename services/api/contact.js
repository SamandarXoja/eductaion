import request from "../request";

export const sendContact = async (body) => {
  return await request.post("/contact-uses", body);
};



