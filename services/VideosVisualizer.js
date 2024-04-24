import { Visualizer } from "./Visualizer.js";
import { debounce } from "./debounce.js";
import { setToLs } from "./storage.js";

class VideosVisualizer extends Visualizer {
  constructor(...args) {
    // DOM
    super(...args);
    this.$videoContainer = null;
    this.$search = null;
    this.$pagination = null;
    this.$themeInput = null;
    this.debouncedSearchValue = debounce(
      (...args) => this.store.updateQueryParam(...args),
      500
    );
    // INVOKING Queue
    this.builder(this.$container, this.store.resource, this.store.id);
  }

  builder(...args) {
    // наследуем метод:
    super.builder(...args);
    this.addListenerToSearch();
    this.addListenerToThemeInput();
  }

  renderUIElems($container) {
    $container.insertAdjacentHTML(
      "beforeend",
      ` <label class="theme"> 
          <div class="theme__icon">
            ${
              this.store.theme === "dark"
                ? `<span class="material-symbols-outlined">
              nightlight
              </span>`
                : `<span class="material-symbols-outlined">
                sunny
                </span>`
            }  
          </div>
          <span class="theme__value">${this.store.theme} </span>  
          <input type="checkbox" class='theme__input' name='theme'>
        </label>
        <div class="loaderWrap">
          <div class="loader"></div>
        </div>
        <section class="searchPanel">
          <input type="search" placeholder=" Поиск: " name="q" value='${
            this.store.query.q
          }'>
        </section>
        <section class="controls">
          <select name="order" class="order">
            ${Object.keys(this.store.orderType)
              .map(
                (key, i) =>
                  `<option value="${this.store.orderType[key]}" ${
                    i === 0 ? "disabled" : ""
                  }> ${key} </option>`
              )
              .join("")};         
          </select>
          <select name="maxResults" class="maxResults">
          ${Object.keys(this.store.maxResultType)
            .map(
              (key, i) =>
                `<option value="${this.store.maxResultType[key]}" ${
                  i === 0 ? "disabled" : ""
                }> ${key} </option>`
            )
            .join("")};         
        </select>
          <div class="controls__pagination">
            <button id="prevPageToken"> 
              <span class="material-symbols-outlined"> navigate_before </span>
            </button>
            <section class="controls__pagination_page"> Стр: ${
              this.store.page
            } </section>                
            <button id="nextPageToken"> 
              <span class="material-symbols-outlined"> navigate_next </span>
            </button>
          </div>        
        </section>             
        <section class="videos"></section>      
      `
    );
    this.$selects.forEach(
      (cls) => (document.querySelector("." + cls).value = this.store.query[cls])
    );
    this.$videoContainer = document.querySelector(".videos");
    this.$loader = document.querySelector(".loaderWrap");
    this.$pagination = document.querySelector(".controls__pagination");
    this.$search = document.querySelector(".searchPanel input");
    this.$themeInput = document.querySelector(".theme__input");
  }

  // LISTENERS ---------------------------------------------
  // CHANGE
  addChangeListenerToContainerHandler = (e) => {
    if (!this.$selects.find((cls) => e.target.matches(`.${cls}`))) return;
    this.store.updateQueryParam(e.target.name, e.target.value);
    setToLs(e.target.name, e.target.value);
  };

  // SELECT ELEMS -----
  addChangeListenerToContainer($container) {
    $container.addEventListener(
      "change",
      this.addChangeListenerToContainerHandler
    );
  }

  // ПАГИНАЦИЯ -----
  addListenerToPaginationHandler = (e) => {
    this.store.updateCurrentVideosPage(e.target.closest("button").id);
  };

  addListenerToPagination() {
    this.$pagination.addEventListener(
      "click",
      this.addListenerToPaginationHandler
    );
  }

  // ПОИСК С СОХРАНЕНИЕМ -----
  addListenerToSearchHandler = (e) => {
    this.debouncedSearchValue(e.target.name, e.target.value.trim());
    setToLs("q", e.target.value.trim());
  };

  addListenerToSearch() {
    this.$search.addEventListener("input", this.addListenerToSearchHandler);
  }

  // THEME ----
  addListenerToThemeInputHandler = (e) => this.store.toggleAppTheme();

  addListenerToThemeInput() {
    this.$themeInput.addEventListener(
      "change",
      this.addListenerToThemeInputHandler
    );
  }
}

export default VideosVisualizer;
