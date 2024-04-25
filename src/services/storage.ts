const setToLs = <T>(key: string, data: T) => (localStorage[key] = data);
const getFromLs = (key: string) => localStorage[key] || "";

// Получение темы:
const getThemeFromLs = (key: string) => localStorage[key] || "dark";

// Получение порядка сортировки видео:
const getOrderFromLs = (key: string) => localStorage[key] || "relevance";

// Получение кол-ва  видео на странице:
const getmaxResultsFromLs = (key: string) => localStorage[key] || "12";

export {
  setToLs,
  getFromLs,
  getThemeFromLs,
  getOrderFromLs,
  getmaxResultsFromLs,
};
