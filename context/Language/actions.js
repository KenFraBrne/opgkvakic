export const setLanguage = (langPath) => {
  const language = require(langPath);
  return language;
}
