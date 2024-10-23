export const removeFalsyValues = (obj) => {
  for (let key in obj) {
    if (
      !obj[key] ||
      (Array.isArray(obj[key]) && obj[key].length === 0) ||
      (Array.isArray(obj[key]) && !obj[key][0])
    ) {
      delete obj[key];
    }
  }
  return obj || {};
};

export const deleteObjProp = (obj, key) => {
  const _obj = { ...obj };

  if (key in _obj) {
    delete _obj[key];
  }

  return _obj;
};

export const formatPrice = (price = 0) => {
  const formatter = new Intl.NumberFormat("uz", {
    maximumSignificantDigits: 2,
    currency: "UZS",
    style: "currency",
  });

  return formatter.format(price);
};
