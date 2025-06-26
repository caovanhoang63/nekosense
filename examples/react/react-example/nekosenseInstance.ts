import { HeatMapTrack, MouseClickTrack, NekoSense } from "nekosense";

export const nekosenseInstance = new NekoSense();

const heatMapEvent = new HeatMapTrack({
  elementIds: [
    "header",
    "product-product-1",
    "product-product-2",
    "product-product-3",
    "product-product-4",
  ],
  preHandler: (ctx, ele, event) => {
    ctx.data.user = {
      userId: 1,
    };
  },
});
const mouseClickEvent = new MouseClickTrack({
  elementIds: [
    "header",
    "product-product-1",
    "product-product-2",
    "product-product-3",
    "product-product-4",
  ],
  preHandler: (ctx, ele, event) => {
    ctx.data.user = {
      userId: 1,
    };
  },
});
nekosenseInstance.add(heatMapEvent);
nekosenseInstance.add(mouseClickEvent);
