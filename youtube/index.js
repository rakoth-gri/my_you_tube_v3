import { store } from "./services/store.js";
import VideosVisualizer from "./services/VideosVisualizer.js";
new VideosVisualizer(store, ".root");

