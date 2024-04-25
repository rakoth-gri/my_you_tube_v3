import {
  getFromLs,
  setToLs,
  getThemeFromLs,
  getOrderFromLs,
  getmaxResultsFromLs,
} from "./storage";
// TYPES:
import { T_PAGINTAION_BTNS, T_RESOURCE, T_ID } from "./../types/types";

const store = {
  root: document.querySelector(":root") as HTMLHtmlElement,
  theme: getThemeFromLs("ut_theme"),
  items: [],
  subscribers: [] as any[],
  query: {
    maxResults: getmaxResultsFromLs("maxResults"),
    order: getOrderFromLs("order"),
    q: getFromLs("q"),
  },
  resource: "search" as T_RESOURCE,
  id: '',
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
  updateQueryParam(key: string, v: string) {
    Object.assign(this.query, { [key]: v });
    this.subscribers.forEach((fn) => fn(this.resource, this.id));
  },
  updateCurrentVideosPage(param: T_PAGINTAION_BTNS) {
    this.currentPageToken = this[param];

    if (!this.currentPageToken) {
      (document.getElementById(param) as HTMLButtonElement).disabled = true;
      return;
    }

    ["nextPageToken", "prevPageToken"].forEach(
      (sel) =>
        ((document.getElementById(sel) as HTMLButtonElement).disabled = false)
    );

    param === "nextPageToken" ? this.page++ : this.page--;

    (
      document.querySelector(".controls__pagination_page") as HTMLDivElement
    ).textContent = `Стр: ` + this.page;

    this.subscribers.forEach((fn) => fn(this.resource, this.id));
  },

  // (resource: T_RESOURCE, id: T_ID) => Promise<void>
  observer<T extends Function>(cb: T) {
    this.subscribers.push(cb);
  },

  toggleAppTheme() {
    this.theme === "dark" ? (this.theme = "light") : (this.theme = "dark");
    setToLs("ut_theme", this.theme);
    this.VisualizeAppTheme(this.theme);
    this.changeRootTheme(this.theme);
  },

  VisualizeAppTheme(theme: string) {
    (document.querySelector(".theme__value") as HTMLSpanElement).textContent =
      theme;
    (document.querySelector(".theme__icon") as HTMLDivElement).innerHTML =
      theme === "dark"
        ? `<span class="material-symbols-outlined">
              nightlight
          </span>`
        : `<span class="material-symbols-outlined">
              sunny
            </span>`;
  },

  changeRootTheme(theme: string) {
    this.root.style.setProperty(
      "--app-default-color",
      `var(--app-${theme}-color)`
    );
    this.root.style.setProperty("--app-default-bg", `var(--app-${theme}-bg)`);
  },
};

// Вызываем тему из LS и рендерим root-styles при аервой загрузке:
store.changeRootTheme(store.theme);

export { store };
