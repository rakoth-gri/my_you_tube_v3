import Api from "./Api";
// TYPES:
import {
  T_ID,
  T_RESOURCE,
  T_STORE,
  I_SEARCH_VIDEOS,
  I_SINGLE_VIDEO,
} from "./../types/types";

export class Visualizer {
  $container: HTMLDivElement | null;
  $loader: HTMLDivElement | null;
  $selects: ("maxResults" | "order")[];
  store: T_STORE;

  constructor(store: T_STORE, selector: string) {
    // DOM
    this.$container = document.querySelector(selector);
    this.$loader = null;
    // LOGIC
    this.$selects = ["maxResults", "order"];
    this.store = store;
  }

  builder($container: HTMLDivElement, resource: T_RESOURCE, id: T_ID) {
    // 0
    this.store.observer(this.getAPIData.bind(this));
    // 1
    this.renderUIElems($container);
    // 2
    this.addListenerToPagination();
    // 3
    this.addChangeListenerToContainer($container);
    // 4
    this.getAPIData(resource, id);
  }

  async getAPIData(resource: T_RESOURCE, id: T_ID): Promise<void> {
    (this.$loader as HTMLDivElement).classList.toggle("active");
    let res = await Api.initData(resource, id);
    if (res instanceof Object) {
      ["items", "totalResults", "nextPageToken", "prevPageToken"].forEach(
        (key) => (this.store[key] = res[key])
      );
      this.store.error = "";
    } else {
      this.store.error = res;
    }
    (this.$loader as HTMLDivElement).classList.toggle("active");
    this.renderAPIData(res);
  }

  renderAPIData(res: string | I_SEARCH_VIDEOS | I_SINGLE_VIDEO) {
    if (typeof res === "string")
      return ((
        this.$videoContainer as HTMLDivElement
      ).innerHTML = `<h2 style="color: brown;"> ${res} </h2>`);

    (this.$videoContainer as HTMLDivElement).innerHTML = (
      res as I_SEARCH_VIDEOS
    ).items
      .map(
        ({ id, publishedAt, title, thumbnails, description, channelId }) => `
        <a href="${`./pages/singleVideo.html?id=${id}`}">
          <article class='card' data-channel='${channelId}'>
              <h4 class="card__title"> ${(title as string).substring(
                0,
                55
              )}... </h4>
              <div class='card__thumbnails'>
                <img alt='thumbnail-${id}' src='${thumbnails}' loading="lazy"/>
              </div>      
              <div class='card__info'> 
                <span> Опубликовано: ${publishedAt}</span> 
              </div>              
          </article>
        </a>`
      )
      .join("");
  }
}
