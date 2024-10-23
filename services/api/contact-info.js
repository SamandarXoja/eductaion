import request from "../request";

export const fetchContactInfo = async () => {
  const res = await request.get("/contact-us-info?populate=deep");

  return res.data;
};
