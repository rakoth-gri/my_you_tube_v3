var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Visualizer } from "./Visualizer.js";
import { debounce } from "./debounce.js";
import { setToLs } from "./storage.js";
var VideosVisualizer = (function (_super) {
    __extends(VideosVisualizer, _super);
    function VideosVisualizer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.addChangeListenerToContainerHandler = function (e) {
            if (!(e.target instanceof HTMLSelectElement))
                return;
            if (!_this.$selects.find(function (cls) { return e.target.matches(".".concat(cls)); }))
                return;
            _this.store.updateQueryParam(e.target.name, e.target.value);
            setToLs(e.target.name, e.target.value);
        };
        _this.addListenerToPaginationHandler = function (e) {
            if (!(e.target instanceof HTMLElement))
                return;
            _this.store.updateCurrentVideosPage(e.target.id);
        };
        _this.addListenerToSearchHandler = function (e) {
            if (!(e.target instanceof HTMLInputElement))
                return;
            _this.debouncedSearchValue(e.target.name, e.target.value.trim());
            setToLs("q", e.target.value.trim());
        };
        _this.addListenerToThemeInputHandler = function (e) { return _this.store.toggleAppTheme(); };
        _this.$videoContainer = null;
        _this.$search = null;
        _this.$pagination = null;
        _this.$themeInput = null;
        _this.debouncedSearchValue = debounce(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.store.updateQueryParam(args[0], args[1]);
        }, 500);
        _this.builder(_this.$container, _this.store.resource, _this.store.id);
        return _this;
    }
    VideosVisualizer.prototype.builder = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.builder.apply(this, args);
        this.addListenerToSearch();
        this.addListenerToThemeInput();
    };
    VideosVisualizer.prototype.renderUIElems = function ($container) {
        var _this = this;
        $container.insertAdjacentHTML("beforeend", " <label class=\"theme\"> \n          <div class=\"theme__icon\">\n            ".concat(this.store.theme === "dark"
            ? "<span class=\"material-symbols-outlined\">\n              nightlight\n              </span>"
            : "<span class=\"material-symbols-outlined\">\n                sunny\n                </span>", "  \n          </div>\n          <span class=\"theme__value\">").concat(this.store.theme, " </span>  \n          <input type=\"checkbox\" class='theme__input' name='theme'>\n        </label>\n        <div class=\"loaderWrap\">\n          <div class=\"loader\"></div>\n        </div>\n        <section class=\"searchPanel\">\n          <input type=\"search\" placeholder=\" \u041F\u043E\u0438\u0441\u043A: \" name=\"q\" value='").concat(this.store.query.q, "'>\n        </section>\n        <section class=\"controls\">\n          <select name=\"order\" class=\"order\">\n            ").concat(Object.keys(this.store.orderType)
            .map(function (key, i) {
            return "<option value=\"".concat(_this.store.orderType[key], "\" ").concat(i === 0 ? "disabled" : "", "> ").concat(key, " </option>");
        })
            .join(""), ";         \n          </select>\n          <select name=\"maxResults\" class=\"maxResults\">\n          ").concat(Object.keys(this.store.maxResultType)
            .map(function (key, i) {
            return "<option value=\"".concat(_this.store.maxResultType[key], "\" ").concat(i === 0 ? "disabled" : "", "> ").concat(key, " </option>");
        })
            .join(""), ";         \n        </select>\n          <div class=\"controls__pagination\">\n            <button id=\"prevPageToken\"> \n              <span class=\"material-symbols-outlined\" id=\"prevPageToken\"> navigate_before </span>\n            </button>\n            <section class=\"controls__pagination_page\"> \u0421\u0442\u0440: ").concat(this.store.page, " </section>                \n            <button id=\"nextPageToken\"> \n              <span class=\"material-symbols-outlined\" id=\"nextPageToken\"> navigate_next </span>\n            </button>\n          </div>        \n        </section>             \n        <section class=\"videos\"></section>      \n      "));
        this.$selects.forEach(function (cls) {
            return (document.querySelector("." + cls).value =
                _this.store.query[cls]);
        });
        this.$videoContainer = document.querySelector(".videos");
        this.$loader = document.querySelector(".loaderWrap");
        this.$pagination = document.querySelector(".controls__pagination");
        this.$search = document.querySelector(".searchPanel input");
        this.$themeInput = document.querySelector(".theme__input");
    };
    VideosVisualizer.prototype.addChangeListenerToContainer = function ($container) {
        $container.addEventListener("change", this.addChangeListenerToContainerHandler);
    };
    VideosVisualizer.prototype.addListenerToPagination = function () {
        this.$pagination.addEventListener("click", this.addListenerToPaginationHandler);
    };
    VideosVisualizer.prototype.addListenerToSearch = function () {
        this.$search.addEventListener("input", this.addListenerToSearchHandler);
    };
    VideosVisualizer.prototype.addListenerToThemeInput = function () {
        this.$themeInput.addEventListener("change", this.addListenerToThemeInputHandler);
    };
    return VideosVisualizer;
}(Visualizer));
export default VideosVisualizer;
