import translations from "@/translations";

const useTranslations = (locale = "") => {
  return translations[locale];
};

export default useTranslations;
