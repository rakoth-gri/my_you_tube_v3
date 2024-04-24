import Api from "./Api.js";

export class Visualizer {
  constructor(store, selector) {
    // DOM
    this.$container = document.querySelector(selector);
    this.$loader = null;
    // LOGIC
    this.$selects = ["maxResults", "order"];
    this.store = store;
  }

  builder($container, resource, id) {
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

  async getAPIData(resource, id) {
    this.$loader.classList.toggle("active");
    let res = await Api.initData(resource, id);
    if (res instanceof Object) {
      ["items", "totalResults", "nextPageToken", "prevPageToken"].forEach(
        (key) => (this.store[key] = res[key])
      );
      this.store.error = "";
    } else {
      this.store.error = res;
    }
    this.$loader.classList.toggle("active");
    this.renderAPIData(res);
  }

  renderAPIData(res) {
    if (this.store.error)
      return (this.$videoContainer.innerHTML = `<h2 style="color: brown;"> ${res} </h2>`);

    this.$videoContainer.innerHTML = res.items
      .map(
        ({ id, publishedAt, title, thumbnails, description, channelId }) => `
        <a href="${`./pages/singleVideo.html?id=${id}`}">
          <article class='card' data-channel='${channelId}'>
              <h4 class="card__title"> ${title.substring(0, 55)}... </h4>
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
