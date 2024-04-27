const API = {
  base: `https://www.googleapis.com/youtube/v3/`,
  key: `AIzaSyAGAUvZJvkDzoNxltE7KcZBJO_zQIJ3kFQ`,
};

// TYPES:
import { T_ID, T_MAX_RESULTS, T_ORDER_TYPE } from "../types/types.js";

const OPTIONS = {
  video: (id: T_ID) => ({
    baseURL: `${API.base}videos?`,
    id,
    key: API.key,
    // fields: "items(id,snippet(channelId,title,categoryId,description,thumbnails,channelTitle,publishedAt),statistics)",
    part: "statistics,snippet,contentDetails,topicDetails,id,status",
  }),
  videoComments: (id: T_ID) => ({
    baseURL: `${API.base}comments?`,
    // Это ID конкретного видео, к которму мы получаем комментарии
    parentId: id,
    key: API.key,
    part: "id,snippet",
    maxResults: 10,
  }),
  popular: (maxResults: T_MAX_RESULTS) => ({
    baseURL: `${API.base}videos/?`,
    chart: "mostPopular",
    key: API.key,
    fields:
      "items(id,snippet(channelId,title,categoryId,description,thumbnails,channelTitle,publishedAt),statistics)",
    part: "statistics,snippet,topicDetails",
    pageToken: "",
    maxResults,
    regionCode: "RU",
  }),
  search: (
    q: string,
    order: T_ORDER_TYPE,
    maxResults: T_MAX_RESULTS,
    pageToken: string
  ) => ({
    baseURL: `${API.base}search?`,
    key: API.key,
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
  channel: (id: T_ID) => ({
    baseURL: `${API.base}channels?`,
    id,
    key: API.key,
    // fields: "items(id,snippet(title),statistics)",
    part: "snippet,statistics,id,contentOwnerDetails",
  }),
};

export type T_OPTIONS = typeof OPTIONS;

export default OPTIONS;
