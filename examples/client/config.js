import {
  NekoSense,
  HeatMapTrack,
  MouseClickTrack,
  HoverToClickTrack,
} from "./../../dist/index.js";
const instance = new NekoSense();
const event = new HeatMapTrack({
  elementIds: ["product-product-1", "product-product-2", "product-product-3"],
  preHandler: (ctx, ele, event) => {
    console.log(ele.id);
    ctx.data.user = {
      userId: 1,
    };
  },
});
instance.add(event);
window.addEventListener("DOMContentLoaded", function () {
  instance.start();
});
