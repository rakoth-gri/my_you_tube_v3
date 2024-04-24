import { getFromLs, setToLs, getThemeFromLs, getOrderFromLs, getmaxResultsFromLs } from "./storage.js";

const store = {
  root: document.querySelector(":root"),
  theme: getThemeFromLs("ut_theme"),
  items: [],
  subscribers: [],
  query: {
    maxResults: getmaxResultsFromLs("maxResults"),
    order: getOrderFromLs("order"),
    q: getFromLs("q"),
  },
  resource: "search",
  id: null,
  totalResults: 0,
  nextPageToken: "",
  prevPageToken: "",
  currentPageToken: "",
  error: "",
  page: 1,
  orderType: {
    "Выберите сортировку": "",
    "По дате": "date",
    "По рейтингу": "rating",
    "По релевантности": "relevance",
    "По названию": "title",
    "По просмотрам": "viewCount",
  },
  maxResultType: {
    "Кол-во клипов на странице:": "",
    "6 клипов": 6,
    "12 клипов": 12,
    "18 клипов": 18,
    "24 клипов": 24,
    "30 клипов": 30,
  },
  updateQueryParam(key, v) {
    Object.assign(this.query, { [key]: v });
    this.subscribers.forEach((fn) => fn(this.resource, this.id));
  },
  updateCurrentVideosPage(param) {
    this.currentPageToken = this[param];

    if (!this.currentPageToken) {
      document.getElementById(param).disabled = true;
      return;
    }

    ["nextPageToken", "prevPageToken"].forEach(
      (sel) => (document.getElementById(sel).disabled = false)
    );

    param === "nextPageToken" ? this.page++ : this.page--;

    document.querySelector(".controls__pagination_page").textContent =
      `Стр: ` + this.page;

    this.subscribers.forEach((fn) => fn(this.resource, this.id));
  },

  observer(cb) {
    this.subscribers.push(cb);
  },

  toggleAppTheme() {
    this.theme === "dark" ? (this.theme = "light") : (this.theme = "dark");
    setToLs("ut_theme", this.theme);
    this.VisualizeAppTheme(this.theme);
    this.changeRootTheme(this.theme);
  },

  VisualizeAppTheme(theme) {
    document.querySelector(".theme__value").textContent = theme;
    document.querySelector(".theme__icon").innerHTML =
      theme === "dark"
        ? `<span class="material-symbols-outlined">
              nightlight
          </span>`
        : `<span class="material-symbols-outlined">
              sunny
            </span>`;
  },

  changeRootTheme(theme) {
    this.root.style.setProperty(
      "--app-default-color",
      `var(--app-${theme}-color)`
    );
    this.root.style.setProperty("--app-default-bg", `var(--app-${theme}-bg)`);
  },
};

// Вызываем тему из LS и рендерим root-styles:
store.changeRootTheme(store.theme);

export { store };

// --app-default-color: var(--app-dark-color);
// --app-default-bg: var(--app-dark-bg);
