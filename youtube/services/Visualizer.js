var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Api from "./Api.js";
var Visualizer = (function () {
    function Visualizer(store, selector) {
        this.$container = document.querySelector(selector);
        this.$loader = null;
        this.$selects = ["maxResults", "order"];
        this.store = store;
    }
    Visualizer.prototype.builder = function ($container, resource, id) {
        this.store.observer(this.getAPIData.bind(this));
        this.renderUIElems($container);
        this.addListenerToPagination();
        this.addChangeListenerToContainer($container);
        this.getAPIData(resource, id);
    };
    Visualizer.prototype.getAPIData = function (resource, id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.$loader.classList.toggle("active");
                        return [4, Api.initData(resource, id)];
                    case 1:
                        res = (_a.sent());
                        if (res instanceof Object) {
                            this.store.items = res.items;
                            this.store.totalResults = res.totalResults;
                            this.store.nextPageToken = res.nextPageToken;
                            this.store.prevPageToken = res.prevPageToken;
                            this.store.error = "";
                        }
                        else {
                            this.store.error = res;
                        }
                        this.$loader.classList.toggle("active");
                        this.renderAPIData(res);
                        return [2];
                }
            });
        });
    };
    Visualizer.prototype.renderAPIData = function (res) {
        if (typeof res === "string")
            return (this.$videoContainer.innerHTML = "<h2 style=\"color: brown;\"> ".concat(res, " </h2>"));
        this.$videoContainer.innerHTML = res.items
            .map(function (_a) {
            var id = _a.id, publishedAt = _a.publishedAt, title = _a.title, thumbnails = _a.thumbnails, description = _a.description, channelId = _a.channelId;
            return "\n        <a href=\"".concat("./pages/singleVideo.html?id=".concat(id), "\">\n          <article class='card' data-channel='").concat(channelId, "'>\n              <h4 class=\"card__title\"> ").concat(title.substring(0, 55), "... </h4>\n              <div class='card__thumbnails'>\n                <img alt='thumbnail-").concat(id, "' src='").concat(thumbnails, "' loading=\"lazy\"/>\n              </div>      \n              <div class='card__info'> \n                <span> \u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043E: ").concat(publishedAt, "</span> \n              </div>              \n          </article>\n        </a>");
        })
            .join("");
    };
    return Visualizer;
}());
export { Visualizer };
