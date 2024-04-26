import OPTIONS from "./options.js";
import { store } from "./store.js";

// TYPES
import { I_SINGLE_VIDEO, T_RESOURCE, T_ID, T_SEARCH_VIDEOS_RESPONSE, T_SINGLE_VIDEO_RESPONSE, I_SEARCH_VIDEOS } from './../types/types';

class DataProcessing {
  getQueryString(params: Record<string, unknown>): string {
    // Object.keys(params) формирует массив ключей в порядке их расположения в объекте!
    return Object.keys(params).reduce(
      (acc, key, index) => `${acc}${index ? "&" : ""}${key}=${params[key]}`,
      ""
    );
  }

  buildReqURL(resource: T_RESOURCE, id: T_ID) {
    let queryObject;
    switch (resource) {
      case "popular":
        queryObject = OPTIONS[resource](store.query.maxResults);
        break;
      case "search":
        queryObject = OPTIONS[resource](
          store.query.q,
          store.query.order,
          store.query.maxResults,
          store.currentPageToken
        );
        break;
      default:
        queryObject = OPTIONS[resource](id);
        break;
    }
    const { baseURL, ...params } = queryObject as Record<string, unknown>;
    return `${baseURL}${this.getQueryString(params)}`;
  }

  getVideosObject<T extends T_SEARCH_VIDEOS_RESPONSE>(res: T, resourse: T_RESOURCE): I_SEARCH_VIDEOS {
    return {
      // not nested keys
      kind: res?.kind || "No Kind",
      nextPageToken: res?.nextPageToken || "",
      prevPageToken: res?.prevPageToken || "",
      totalResults: res?.pageInfo?.totalResults ?? 0,
      resultsPerPage: res?.pageInfo?.resultsPerPage ?? 0,
      //items key
      items:
        res?.items?.map((obj, i) => ({
          id: resourse === "search" ? obj?.id?.videoId : obj?.id,
          publishedAt:
            new Date(obj?.snippet?.publishedAt).toLocaleDateString() ||
            "No Info",
          title: obj?.snippet?.title ?? "No Title",
          thumbnails: obj?.snippet?.thumbnails?.medium?.url ?? "./img/plug.jpg",
          description: obj?.snippet?.description ?? "No Description",
          categoryId: obj?.snippet?.categoryId ?? "No CategoryId",
          channelId: obj?.snippet?.channelId ?? "No channelId",
          channelTitle: obj?.snippet?.channelTitle ?? "No channelTitle",
          viewCount: obj?.statistics?.viewCount ?? 0,
          likeCount: obj?.statistics?.likeCount ?? 0,
          commentCount: obj?.statistics?.commentCount ?? 0,
          favoriteCount: obj?.statistics?.favoriteCount ?? 0,
          dislikeCount: obj?.statistics?.dislikeCount ?? 0,
        })) || [],
    };
  }

  getVideoObject<T extends T_SINGLE_VIDEO_RESPONSE>(res: T): I_SINGLE_VIDEO {
    const data = res?.items[0];

    return {
      // not nested keys
      id: data?.id,
      // snippet key
      publishedAt:
        new Date(data?.snippet?.publishedAt).toLocaleDateString() || "No Info",
      title: data?.snippet?.title ?? "No Title",
      thumbnails:
        data?.snippet?.thumbnails?.high?.url ||
        data?.snippet?.thumbnails?.standart?.url ||
        "./img/plug.jpg",
      description: data?.snippet?.description ?? "No Description",
      categoryId: data?.snippet?.categoryId ?? "No CategoryId",
      channelId: data?.snippet?.channelId ?? "No channelId",
      channelTitle: data?.snippet?.channelTitle ?? "No Channel Title",      
      tags: data?.snippet?.tags || [],
      // statistics key
      viewCount: data?.statistics?.viewCount ?? 0,
      likeCount: data?.statistics?.likeCount ?? 0,
      commentCount: data?.statistics?.commentCount ?? 0,
      favoriteCount: data?.statistics?.favoriteCount ?? 0,
      dislikeCount: data?.statistics?.dislikeCount ?? 0,
      // status key
      madeForKids: data?.status?.madeForKids ?? "",
      license: data?.status?.license ?? "No license",
    };
  }
}

export default new DataProcessing();
