export const createQueryString = (searchParams, name, value) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};

export const createMultiQueryString = (searchParams, name, value) => {
  const params = new URLSearchParams(searchParams.toString());
  params.append(name, value);

  return params.toString();
};

export const removeQueryString = (searchParams, name, value) => {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(name, value);

  return params.toString();
};
