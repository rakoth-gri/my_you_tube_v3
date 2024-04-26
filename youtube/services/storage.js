var setToLs = function (key, data) { return (localStorage[key] = data); };
var getFromLs = function (key) { return localStorage[key] || ""; };
var getThemeFromLs = function (key) { return localStorage[key] || "dark"; };
var getOrderFromLs = function (key) { return localStorage[key] || "relevance"; };
var getmaxResultsFromLs = function (key) { return localStorage[key] || "12"; };
export { setToLs, getFromLs, getThemeFromLs, getOrderFromLs, getmaxResultsFromLs, };
