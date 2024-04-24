const setToLs = (key, data) => (localStorage[key] = data);
const getFromLs = (key) => localStorage[key] || "";

// Получение темы:
const getThemeFromLs = (key) => localStorage[key] || "dark";

// Получение порядка сортировки видео:
const getOrderFromLs = (key) => localStorage[key] || "relevance";

// Получение кол-ва  видео на странице:
const getmaxResultsFromLs = (key) => localStorage[key] || "12";

export {
  setToLs,
  getFromLs,
  getThemeFromLs,
  getOrderFromLs,
  getmaxResultsFromLs,
};
