import { store } from "./services/store.js";
import VideosVisualizer from "./services/VideosVisualizer.js";

new VideosVisualizer(store, ".root")


// Популярное в РФ:
// getData(store.resource);

// Конкретное видео:
// getData("video", `l9qrzgKi3Jw`)

// Комментарии к конкретному видео:
// getData("videoComments", `WMtPPuvPCWw`)

// Конкретный канал:
// getData("channel", `UC3JKXXWqrpNebvdeN1sBpkA`)

// Поисковый запрос:
// getData(store.resource);


