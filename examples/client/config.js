import {
  NekoSense,
  HoverToClickTrack,
  MouseClickTrack,
} from "./../../dist/index.js";
const instance = new NekoSense();
const event = new HoverToClickTrack({
  elementIds: [
    "header",
    "product-product-1",
    "product-product-2",
    "product-product-3",
  ],
  preHandler: (ctx, ele, event) => {
    ctx.data.user = {
      userId: 1,
    };
  },
});
instance.add(event);
instance.heatMap(window);
window.addEventListener("DOMContentLoaded", function () {
  instance.start();
});
