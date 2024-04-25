import { Visualizer } from "./Visualizer";
import { debounce } from "./debounce";
import { setToLs } from "./storage";
// TYPES:
import { T_PAGINTAION_BTNS, T_STORE, T_RESOURCE } from "./../types/types";

class VideosVisualizer extends Visualizer {
  $videoContainer: null | HTMLDivElement;
  $pagination: null | HTMLDivElement;
  // INPUTS DOM:
  $themeInput: null | HTMLInputElement;
  $search: null | HTMLInputElement;
  debouncedSearchValue: (...args: unknown[]) => any;

  constructor(...args: [T_STORE, string]) {
    // DOM
    super(...args);
    this.$videoContainer = null;
    this.$search = null;
    this.$pagination = null;
    this.$themeInput = null;
    this.debouncedSearchValue = debounce(
      (...args: unknown[]) => this.store.updateQueryParam(...args),
      500
    );
    // INVOKING Queue
    this.builder(
      this.$container as HTMLDivElement,
      this.store.resource,
      this.store.id
    );
  }

  builder(...args: [HTMLDivElement, T_RESOURCE, string]) {
    // наследуем метод:
    super.builder(...args);
    this.addListenerToSearch();
    this.addListenerToThemeInput();
  }

  renderUIElems($container: HTMLDivElement) {
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
                  `<option value="${
                    this.store.orderType[
                      key as keyof typeof this.store.orderType
                    ]
                  }" ${i === 0 ? "disabled" : ""}> ${key} </option>`
              )
              .join("")};         
          </select>
          <select name="maxResults" class="maxResults">
          ${Object.keys(this.store.maxResultType)
            .map(
              (key, i) =>
                `<option value="${
                  this.store.maxResultType[
                    key as keyof typeof this.store.maxResultType
                  ]
                }" ${i === 0 ? "disabled" : ""}> ${key} </option>`
            )
            .join("")};         
        </select>
          <div class="controls__pagination">
            <button id="prevPageToken"> 
              <span class="material-symbols-outlined" id="prevPageToken"> navigate_before </span>
            </button>
            <section class="controls__pagination_page"> Стр: ${
              this.store.page
            } </section>                
            <button id="nextPageToken"> 
              <span class="material-symbols-outlined" id="nextPageToken"> navigate_next </span>
            </button>
          </div>        
        </section>             
        <section class="videos"></section>      
      `
    );
    this.$selects.forEach(
      (cls) =>
        ((document.querySelector("." + cls) as HTMLInputElement).value =
          this.store.query[cls])
    );
    this.$videoContainer = document.querySelector(".videos");
    this.$loader = document.querySelector(".loaderWrap");
    this.$pagination = document.querySelector(".controls__pagination");
    this.$search = document.querySelector(".searchPanel input");
    this.$themeInput = document.querySelector(".theme__input");
  }

  // LISTENERS ---------------------------------------------
  // CHANGE
  addChangeListenerToContainerHandler = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    if (!this.$selects.find((cls) => (e.target as HTMLElement).matches(`.${cls}`))) return;
    this.store.updateQueryParam(e.target.name, e.target.value);
    setToLs(e.target.name, e.target.value);
  };

  // SELECT ELEMS -----
  addChangeListenerToContainer($container: HTMLDivElement) {
    $container.addEventListener(
      "change",
      this.addChangeListenerToContainerHandler
    );
  }

  // ПАГИНАЦИЯ -----
  addListenerToPaginationHandler = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;
    this.store.updateCurrentVideosPage(e.target.id as T_PAGINTAION_BTNS);
  };

  addListenerToPagination() {
    (this.$pagination as HTMLDivElement).addEventListener(
      "click",
      this.addListenerToPaginationHandler
    );
  }

  // ПОИСК С СОХРАНЕНИЕМ -----
  addListenerToSearchHandler = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    this.debouncedSearchValue(e.target.name, e.target.value.trim());
    setToLs("q", e.target.value.trim());
  };

  addListenerToSearch() {
    (this.$search as HTMLInputElement).addEventListener(
      "input",
      this.addListenerToSearchHandler
    );
  }

  // THEME ----
  addListenerToThemeInputHandler = (e: Event) => this.store.toggleAppTheme();

  addListenerToThemeInput() {
    (this.$themeInput as HTMLInputElement).addEventListener(
      "change",
      this.addListenerToThemeInputHandler
    );
  }
}

export default VideosVisualizer;
