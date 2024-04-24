import { Visualizer } from "./Visualizer.js";

const CHANNEL = "https://www.youtube.com/channel/";

class SingleVideoVisualizer extends Visualizer {
  constructor(...args) {
    super(...args);
    // DOM
    this.$loader = null;
    this.videoId = location.search.replace("?id=", "");
    this.resource = "video";
    // INVOKING Queue
    this.renderUIElems();
    this.getAPIData(this.resource, this.videoId);
  }

  renderUIElems() {
    this.$container.insertAdjacentHTML(
      "beforeend",
      `<div class="loaderWrap">
            <div class="loader"></div>
        </div>`
    );
    this.$loader = document.querySelector(".loaderWrap");
  }

  renderAPIData(res) {
    console.log(res);

    if (this.store.error)
      return (this.$videoContainer.innerHTML = `<h2 style="color: brown;"> ${res} </h2>`);

    const {
      id,
      publishedAt,
      title,
      thumbnails,
      description,
      categoryId,
      channelId,
      channelTitle,
      tags,
      viewCount,
      likeCount,
      commentCount,
      favoriteCount,
      dislikeCount,
      madeForKids,
      license,
    } = res;

       

    this.$container.insertAdjacentHTML(
      "beforeend",
      `
      <section class="video">
        <h1> ${title} HELLO </h1>
        <div class="chanellTitle">
          <a href="${`${CHANNEL}${channelId}`}" title="${channelTitle}">
            Перейти на страницу канала...
          </a>
        </div>
        <section class="meta">
          <div class="meta__madeForKids">
            <span> ${
              madeForKids ? "Детский контент" : "Зaпрещено для детей"
            } </span>
            
          </div>
          <div class="meta__categoryId">
              Категория: ${categoryId}
          </div>  
        </section>              
        <iframe         
          height="600"
          src="https://www.youtube.com/embed/${id}"
          title="${title.substring(0, 30)}..."
          frameborder="0"
          class='iframe'
        ></iframe>
        <div class="videoInfo">
          <span>Опубликовано: ${publishedAt} </span>
          <div class="videoInfo__stats">
            <div class="videoInfo__stats_viewCount">
              <span class="material-symbols-outlined">visibility</span>
              ${Number(viewCount).toLocaleString()}
            </div>
            <div class="videoInfo__stats_likeCount">
              <span class="material-symbols-outlined">thumb_up</span>
              ${Number(likeCount).toLocaleString()}
            </div>
            <div class="videoInfo__stats_commentCount">
              <span class="material-symbols-outlined">chat</span>
              ${Number(commentCount).toLocaleString()}
            </div>
            <div class="videoInfo__stats_favoriteCount">
              <span class="material-symbols-outlined">favorite</span>
              ${Number(favoriteCount).toLocaleString()}
            </div>
            <div class="videoInfo__stats_dislikeCount">
              <span class="material-symbols-outlined">thumb_down</span>
              ${+dislikeCount.toLocaleString()}
            </div>          
          </div>
        </div>
        <p class="description">
          ${description}
        </p>
        <h2> Возможно Вы искали: </h2>
        <div class="tags">
          ${tags
            .slice(0, -5)
            .map(
              (tag) =>
                `<a href='${`https://www.youtube.com/results?search_query=${tag}`}' title='tag'> #${tag} </a>`
            )}
        </div>  
      </section>`
    );
  }
}

export default SingleVideoVisualizer;
