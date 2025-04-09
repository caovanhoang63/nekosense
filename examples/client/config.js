import {
  NekoSense,
  HeatMapTrack,
  MouseClickTrack,
  HoverToClickTrack,
} from "./../../dist/index.js";
const instance = new NekoSense();
const event = new HeatMapTrack([
  "product-product-1",
  "product-product-2",
  "product-product-3",
]);
instance.add(event);
window.addEventListener("DOMContentLoaded", function () {
  instance.start();
});
