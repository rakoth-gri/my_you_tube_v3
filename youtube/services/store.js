import { getFromLs, setToLs, getThemeFromLs, getOrderFromLs, getmaxResultsFromLs, } from "./storage.js";
var store = {
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
    id: "",
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
        "Кол-во клипов на странице": "",
        "6 клипов": '6',
        "12 клипов": '12',
        "18 клипов": '18',
        "24 клипа": '24',
        "30 клипов": '30',
    },
    updateQueryParam: function (key, v) {
        var _a;
        var _this = this;
        Object.assign(this.query, (_a = {}, _a[key] = v, _a));
        this.subscribers.forEach(function (fn) { return fn(_this.resource, _this.id); });
    },
    updateCurrentVideosPage: function (param) {
        var _this = this;
        this.currentPageToken = this[param];
        if (!this.currentPageToken) {
            document.getElementById(param).disabled = true;
            return;
        }
        ["nextPageToken", "prevPageToken"].forEach(function (sel) {
            return (document.getElementById(sel).disabled = false);
        });
        param === "nextPageToken" ? this.page++ : this.page--;
        document.querySelector(".controls__pagination_page").textContent = "\u0421\u0442\u0440: " + this.page;
        this.subscribers.forEach(function (fn) { return fn(_this.resource, _this.id); });
    },
    observer: function (cb) {
        this.subscribers.push(cb);
    },
    toggleAppTheme: function () {
        this.theme === "dark" ? (this.theme = "light") : (this.theme = "dark");
        setToLs("ut_theme", this.theme);
        this.VisualizeAppTheme(this.theme);
        this.changeRootTheme(this.theme);
    },
    VisualizeAppTheme: function (theme) {
        document.querySelector(".theme__value").textContent =
            theme;
        document.querySelector(".theme__icon").innerHTML =
            theme === "dark"
                ? "<span class=\"material-symbols-outlined\">\n              nightlight\n          </span>"
                : "<span class=\"material-symbols-outlined\">\n              sunny\n            </span>";
    },
    changeRootTheme: function (theme) {
        this.root.style.setProperty("--app-default-color", "var(--app-".concat(theme, "-color)"));
        this.root.style.setProperty("--app-default-bg", "var(--app-".concat(theme, "-bg)"));
    },
};
store.changeRootTheme(store.theme);
export { store };
