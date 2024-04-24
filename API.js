
const OPTIONS = {
  channel: (id) => ({
    baseURL:
      "https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.channels.list?",
    part: "snippet,contentDetails",
    id,
  }),
  video: (id) => ({
    baseURL: "https://www.googleapis.com/youtube/v3/videos?",
    id,
    key: "AIzaSyAGAUvZJvkDzoNxltE7KcZBJO_zQIJ3kFQ",
    fields: "items(id,snippet(channelId,title,categoryId),statistics)",
    part: "snippet,statistics",
  }),
};

export default class Api {
  static fetchData(url) {
    return fetch(url)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  }

  static buildReq(id, key) {
    let { baseURL, ...params } = OPTIONS[key](id);
    // Object.keys(params) формирует массив ключей в порядке их расположения в объекте!
    return Object.keys(params).reduce(
      (acc, key, i) => `${acc}${i ? "&" : ""}${key}=${params[key]}`,
      ""
    );
  }

  static getChannelById = async (id, key) => {
    let url = Api.buildReq(id, key);
    return await Api.fetchData(url);
  };

  static getVideoById = async (id, key) => {
    let url = Api.buildReq(id, key);
    return await Api.fetchData(url);
  };
}
