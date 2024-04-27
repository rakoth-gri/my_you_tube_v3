import { store } from "../services/store.js";
import SingleVideoVisualizer from "../services/SingleVideoVisualizer.js";

// Класс отрисовки страницы
new SingleVideoVisualizer(store, ".root");
