var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import OPTIONS from "./options.js";
import { store } from "./store.js";
var DataProcessing = (function () {
    function DataProcessing() {
    }
    DataProcessing.prototype.getQueryString = function (params) {
        return Object.keys(params).reduce(function (acc, key, index) { return "".concat(acc).concat(index ? "&" : "").concat(key, "=").concat(params[key]); }, "");
    };
    DataProcessing.prototype.buildReqURL = function (resource, id) {
        var queryObject;
        switch (resource) {
            case "popular":
                queryObject = OPTIONS[resource](store.query.maxResults);
                break;
            case "search":
                queryObject = OPTIONS[resource](store.query.q, store.query.order, store.query.maxResults, store.currentPageToken);
                break;
            default:
                queryObject = OPTIONS[resource](id);
                break;
        }
        var _a = queryObject, baseURL = _a.baseURL, params = __rest(_a, ["baseURL"]);
        return "".concat(baseURL).concat(this.getQueryString(params));
    };
    DataProcessing.prototype.getVideosObject = function (res, resourse) {
        var _a, _b, _c, _d, _e;
        return {
            kind: (res === null || res === void 0 ? void 0 : res.kind) || "No Kind",
            nextPageToken: (res === null || res === void 0 ? void 0 : res.nextPageToken) || "",
            prevPageToken: (res === null || res === void 0 ? void 0 : res.prevPageToken) || "",
            totalResults: (_b = (_a = res === null || res === void 0 ? void 0 : res.pageInfo) === null || _a === void 0 ? void 0 : _a.totalResults) !== null && _b !== void 0 ? _b : 0,
            resultsPerPage: (_d = (_c = res === null || res === void 0 ? void 0 : res.pageInfo) === null || _c === void 0 ? void 0 : _c.resultsPerPage) !== null && _d !== void 0 ? _d : 0,
            items: ((_e = res === null || res === void 0 ? void 0 : res.items) === null || _e === void 0 ? void 0 : _e.map(function (obj, i) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
                return ({
                    id: resourse === "search" ? (_a = obj === null || obj === void 0 ? void 0 : obj.id) === null || _a === void 0 ? void 0 : _a.videoId : obj === null || obj === void 0 ? void 0 : obj.id,
                    publishedAt: new Date((_b = obj === null || obj === void 0 ? void 0 : obj.snippet) === null || _b === void 0 ? void 0 : _b.publishedAt).toLocaleDateString() ||
                        "No Info",
                    title: (_d = (_c = obj === null || obj === void 0 ? void 0 : obj.snippet) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : "No Title",
                    thumbnails: (_h = (_g = (_f = (_e = obj === null || obj === void 0 ? void 0 : obj.snippet) === null || _e === void 0 ? void 0 : _e.thumbnails) === null || _f === void 0 ? void 0 : _f.medium) === null || _g === void 0 ? void 0 : _g.url) !== null && _h !== void 0 ? _h : "./img/plug.jpg",
                    description: (_k = (_j = obj === null || obj === void 0 ? void 0 : obj.snippet) === null || _j === void 0 ? void 0 : _j.description) !== null && _k !== void 0 ? _k : "No Description",
                    categoryId: (_m = (_l = obj === null || obj === void 0 ? void 0 : obj.snippet) === null || _l === void 0 ? void 0 : _l.categoryId) !== null && _m !== void 0 ? _m : "No CategoryId",
                    channelId: (_p = (_o = obj === null || obj === void 0 ? void 0 : obj.snippet) === null || _o === void 0 ? void 0 : _o.channelId) !== null && _p !== void 0 ? _p : "No channelId",
                    channelTitle: (_r = (_q = obj === null || obj === void 0 ? void 0 : obj.snippet) === null || _q === void 0 ? void 0 : _q.channelTitle) !== null && _r !== void 0 ? _r : "No channelTitle",
                    viewCount: (_t = (_s = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _s === void 0 ? void 0 : _s.viewCount) !== null && _t !== void 0 ? _t : 0,
                    likeCount: (_v = (_u = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _u === void 0 ? void 0 : _u.likeCount) !== null && _v !== void 0 ? _v : 0,
                    commentCount: (_x = (_w = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _w === void 0 ? void 0 : _w.commentCount) !== null && _x !== void 0 ? _x : 0,
                    favoriteCount: (_z = (_y = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _y === void 0 ? void 0 : _y.favoriteCount) !== null && _z !== void 0 ? _z : 0,
                    dislikeCount: (_1 = (_0 = obj === null || obj === void 0 ? void 0 : obj.statistics) === null || _0 === void 0 ? void 0 : _0.dislikeCount) !== null && _1 !== void 0 ? _1 : 0,
                });
            })) || [],
        };
    };
    DataProcessing.prototype.getVideoObject = function (res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
        var data = res === null || res === void 0 ? void 0 : res.items[0];
        return {
            id: data === null || data === void 0 ? void 0 : data.id,
            publishedAt: new Date((_a = data === null || data === void 0 ? void 0 : data.snippet) === null || _a === void 0 ? void 0 : _a.publishedAt).toLocaleDateString() || "No Info",
            title: (_c = (_b = data === null || data === void 0 ? void 0 : data.snippet) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : "No Title",
            thumbnails: ((_f = (_e = (_d = data === null || data === void 0 ? void 0 : data.snippet) === null || _d === void 0 ? void 0 : _d.thumbnails) === null || _e === void 0 ? void 0 : _e.high) === null || _f === void 0 ? void 0 : _f.url) ||
                ((_j = (_h = (_g = data === null || data === void 0 ? void 0 : data.snippet) === null || _g === void 0 ? void 0 : _g.thumbnails) === null || _h === void 0 ? void 0 : _h.standart) === null || _j === void 0 ? void 0 : _j.url) ||
                "./img/plug.jpg",
            description: (_l = (_k = data === null || data === void 0 ? void 0 : data.snippet) === null || _k === void 0 ? void 0 : _k.description) !== null && _l !== void 0 ? _l : "No Description",
            categoryId: (_o = (_m = data === null || data === void 0 ? void 0 : data.snippet) === null || _m === void 0 ? void 0 : _m.categoryId) !== null && _o !== void 0 ? _o : "No CategoryId",
            channelId: (_q = (_p = data === null || data === void 0 ? void 0 : data.snippet) === null || _p === void 0 ? void 0 : _p.channelId) !== null && _q !== void 0 ? _q : "No channelId",
            channelTitle: (_s = (_r = data === null || data === void 0 ? void 0 : data.snippet) === null || _r === void 0 ? void 0 : _r.channelTitle) !== null && _s !== void 0 ? _s : "No Channel Title",
            tags: ((_t = data === null || data === void 0 ? void 0 : data.snippet) === null || _t === void 0 ? void 0 : _t.tags) || [],
            viewCount: (_v = (_u = data === null || data === void 0 ? void 0 : data.statistics) === null || _u === void 0 ? void 0 : _u.viewCount) !== null && _v !== void 0 ? _v : 0,
            likeCount: (_x = (_w = data === null || data === void 0 ? void 0 : data.statistics) === null || _w === void 0 ? void 0 : _w.likeCount) !== null && _x !== void 0 ? _x : 0,
            commentCount: (_z = (_y = data === null || data === void 0 ? void 0 : data.statistics) === null || _y === void 0 ? void 0 : _y.commentCount) !== null && _z !== void 0 ? _z : 0,
            favoriteCount: (_1 = (_0 = data === null || data === void 0 ? void 0 : data.statistics) === null || _0 === void 0 ? void 0 : _0.favoriteCount) !== null && _1 !== void 0 ? _1 : 0,
            dislikeCount: (_3 = (_2 = data === null || data === void 0 ? void 0 : data.statistics) === null || _2 === void 0 ? void 0 : _2.dislikeCount) !== null && _3 !== void 0 ? _3 : 0,
            madeForKids: (_5 = (_4 = data === null || data === void 0 ? void 0 : data.status) === null || _4 === void 0 ? void 0 : _4.madeForKids) !== null && _5 !== void 0 ? _5 : "",
            license: (_7 = (_6 = data === null || data === void 0 ? void 0 : data.status) === null || _6 === void 0 ? void 0 : _6.license) !== null && _7 !== void 0 ? _7 : "No license",
        };
    };
    return DataProcessing;
}());
export default new DataProcessing();
