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
var CHANNEL = "https://www.youtube.com/channel/";
var SingleVideoVisualizer = (function (_super) {
    __extends(SingleVideoVisualizer, _super);
    function SingleVideoVisualizer() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.$loader = null;
        _this.videoId = location.search.replace("?id=", "");
        _this.resource = "video";
        _this.renderUIElems();
        _this.getAPIData(_this.resource, _this.videoId);
        return _this;
    }
    SingleVideoVisualizer.prototype.renderUIElems = function () {
        this.$container.insertAdjacentHTML("beforeend", "<div class=\"loaderWrap\">\n            <div class=\"loader\"></div>\n        </div>");
        this.$loader = document.querySelector(".loaderWrap");
    };
    SingleVideoVisualizer.prototype.renderAPIData = function (res) {
        if (typeof res === 'string')
            return (this.$container.innerHTML = "<h2 style=\"color: brown;\"> ".concat(res, " </h2>"));
        var id = res.id, publishedAt = res.publishedAt, title = res.title, thumbnails = res.thumbnails, description = res.description, categoryId = res.categoryId, channelId = res.channelId, channelTitle = res.channelTitle, tags = res.tags, viewCount = res.viewCount, likeCount = res.likeCount, commentCount = res.commentCount, favoriteCount = res.favoriteCount, dislikeCount = res.dislikeCount, madeForKids = res.madeForKids, license = res.license;
        this.$container.insertAdjacentHTML("beforeend", "\n      <section class=\"video\">\n        <h1> ".concat(title, " HELLO </h1>\n        <div class=\"chanellTitle\">\n          <a href=\"").concat("".concat(CHANNEL).concat(channelId), "\" title=\"").concat(channelTitle, "\">\n            \u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043A\u0430\u043D\u0430\u043B\u0430...\n          </a>\n        </div>\n        <section class=\"meta\">\n          <div class=\"meta__madeForKids\">\n            <span> ").concat(madeForKids ? "Детский контент" : "Зaпрещено для детей", " </span>\n            \n          </div>\n          <div class=\"meta__categoryId\">\n              \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F: ").concat(categoryId, "\n          </div>  \n        </section>              \n        <iframe         \n          height=\"600\"\n          src=\"https://www.youtube.com/embed/").concat(id, "\"\n          title=\"").concat(title.substring(0, 30), "...\"\n          frameborder=\"0\"\n          class='iframe'\n        ></iframe>\n        <div class=\"videoInfo\">\n          <span>\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043E: ").concat(publishedAt, " </span>\n          <div class=\"videoInfo__stats\">\n            <div class=\"videoInfo__stats_viewCount\">\n              <span class=\"material-symbols-outlined\">visibility</span>\n              ").concat(Number(viewCount).toLocaleString(), "\n            </div>\n            <div class=\"videoInfo__stats_likeCount\">\n              <span class=\"material-symbols-outlined\">thumb_up</span>\n              ").concat(Number(likeCount).toLocaleString(), "\n            </div>\n            <div class=\"videoInfo__stats_commentCount\">\n              <span class=\"material-symbols-outlined\">chat</span>\n              ").concat(Number(commentCount).toLocaleString(), "\n            </div>\n            <div class=\"videoInfo__stats_favoriteCount\">\n              <span class=\"material-symbols-outlined\">favorite</span>\n              ").concat(Number(favoriteCount).toLocaleString(), "\n            </div>\n            <div class=\"videoInfo__stats_dislikeCount\">\n              <span class=\"material-symbols-outlined\">thumb_down</span>\n              ").concat(+dislikeCount.toLocaleString(), "\n            </div>          \n          </div>\n        </div>\n        <p class=\"description\">\n          ").concat(description, "\n        </p>\n        <h2> \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0412\u044B \u0438\u0441\u043A\u0430\u043B\u0438: </h2>\n        <div class=\"tags\">\n          ").concat(tags
            .slice(0, -5)
            .map(function (tag) {
            return "<a href='".concat("https://www.youtube.com/results?search_query=".concat(tag), "' title='tag'> #").concat(tag, " </a>");
        }), "\n        </div>  \n      </section>"));
    };
    return SingleVideoVisualizer;
}(Visualizer));
export default SingleVideoVisualizer;
