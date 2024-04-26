var BASE_URL = "https://www.googleapis.com/youtube/v3/";
var API_KEY = "AIzaSyAGAUvZJvkDzoNxltE7KcZBJO_zQIJ3kFQ";
var OPTIONS = {
    video: function (id) { return ({
        baseURL: "".concat(BASE_URL, "videos?"),
        id: id,
        key: API_KEY,
        part: "statistics,snippet,contentDetails,topicDetails,id,status",
    }); },
    videoComments: function (id) { return ({
        baseURL: "".concat(BASE_URL, "comments?"),
        parentId: id,
        key: API_KEY,
        part: "id,snippet",
        maxResults: 10,
    }); },
    popular: function (maxResults) { return ({
        baseURL: "".concat(BASE_URL, "videos/?"),
        chart: "mostPopular",
        key: API_KEY,
        fields: "items(id,snippet(channelId,title,categoryId,description,thumbnails,channelTitle,publishedAt),statistics)",
        part: "statistics,snippet,topicDetails",
        pageToken: "",
        maxResults: maxResults,
        regionCode: "RU",
    }); },
    search: function (q, order, maxResults, pageToken) { return ({
        baseURL: "".concat(BASE_URL, "search?"),
        key: API_KEY,
        q: q,
        part: "snippet",
        maxResults: maxResults,
        order: order,
        pageToken: pageToken,
        regionCode: "RU",
        safeSearch: "moderate",
        type: "video",
        videoDefinition: "high",
    }); },
    channel: function (id) { return ({
        baseURL: "".concat(BASE_URL, "channels?"),
        id: id,
        key: API_KEY,
        part: "snippet,statistics,id,contentOwnerDetails",
    }); },
};
export default OPTIONS;
