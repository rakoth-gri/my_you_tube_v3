import DataProcessing from "./DataProcessing.js";

export default class Api {
  // static fetchData(url) {
  //   return fetch(url)
  //     .then((res) => res.json())
  //     .catch((e) => console.log(e));
  // }
  
  static fetchData = async(url) => {
    try {
      let res = await fetch(url)           
      if (!res.ok) {
        throw new Error("Something Got Wrong: check the correction of URL-address, querry-params or Your Account Quota!")
      }
      return await res.json()
    } catch (error) {
      return error.message
    }   
  } 

  static initData = async (resource, id) => {
    let url = DataProcessing.buildReqURL(resource, id);
    let res = await Api.fetchData(url);
    if (res instanceof Object && resource !== 'video') {
      return DataProcessing.getVideosObject(res, resource);
    }
    if (res instanceof Object && resource === 'video') {
      return DataProcessing.getVideoObject(res, resource);
    }        
    return res;
  };
}
