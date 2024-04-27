import DataProcessing from "./DataProcessing.js";

// TYPES:
import {
  T_RESOURCE,
  T_ID,
  T_SINGLE_VIDEO_RESPONSE,
  T_SEARCH_VIDEOS_RESPONSE,
} from "../types/types";

export default class Api {

  static fetchData = async (
    url: string
  ): Promise<T_SEARCH_VIDEOS_RESPONSE | string | T_SINGLE_VIDEO_RESPONSE> => {
    try {
      let res = await fetch(url);
      if (!res.ok) {
        throw new Error(
          "Something Got Wrong: check the correction of URL-address, querry-params or Your Account Quota!"
        );
      }
      return await res.json();
    } catch (error) {
      if (error instanceof Error) return error.message;
      return "";
    }
  };

  static initData = async (resource: T_RESOURCE, id: T_ID) => {
    let url = DataProcessing.buildReqURL(resource, id);
    let res = await Api.fetchData(url);
    if (res instanceof Object && resource === "search") {
      return DataProcessing.getVideosObject(
        res as T_SEARCH_VIDEOS_RESPONSE,
        resource
      );
    }
    if (res instanceof Object && resource === "video") {
      return DataProcessing.getVideoObject(res as T_SINGLE_VIDEO_RESPONSE);
    }
    return res as string;
  };
}
