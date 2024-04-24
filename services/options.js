const BASE_URL = `https://www.googleapis.com/youtube/v3/`;
const API_KEY = `AIzaSyAGAUvZJvkDzoNxltE7KcZBJO_zQIJ3kFQ`;

const OPTIONS = {
  video: (id) => ({
    baseURL: `${BASE_URL}videos?`,
    id,
    key: API_KEY,
    // fields: "items(id,snippet(channelId,title,categoryId,description,thumbnails,channelTitle,publishedAt),statistics)",
    part: "statistics,snippet,contentDetails,topicDetails,id,status",
  }),
  videoComments: (id) => ({
    baseURL: `${BASE_URL}comments?`,
    // Это ID конкретного видео, к которму мы получаем комментарии
    parentId: id,
    key: API_KEY,
    part: "id,snippet",
    maxResults: 10,
  }),
  popular: (maxResults) => ({
    baseURL: `${BASE_URL}videos/?`,
    chart: "mostPopular",
    key: API_KEY,
    fields:
      "items(id,snippet(channelId,title,categoryId,description,thumbnails,channelTitle,publishedAt),statistics)",
    part: "statistics,snippet,topicDetails",
    pageToken: "",
    maxResults,
    regionCode: "RU",
  }),
  search: (q, order, maxResults, pageToken) => ({
    baseURL: `${BASE_URL}search?`,
    key: API_KEY,
    q,
    part: "snippet",
    maxResults,
    order,
    pageToken,
    regionCode: "RU",
    safeSearch: "moderate",
    type: "video",
    videoDefinition: "high",    
  }),
  channel: (id) => ({
    baseURL: `${BASE_URL}channels?`,
    id,
    key: API_KEY,
    // fields: "items(id,snippet(title),statistics)",
    part: "snippet,statistics,id,contentOwnerDetails",
  }),
};

export default OPTIONS;
