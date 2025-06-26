import {
  Config,
  HoverToClickTrack,
  MouseClickTrack,
  NekoSense,
} from "../../../src";

const config: Config = {
  protocol: "http",
  endPoint: "http://localhost:8080/event",
};
export const nekosenseInstance = new NekoSense(config);

const mouseClickEvent = new MouseClickTrack({
  elementIds: [
    "header",
    "product-product-1",
    "product-product-2",
    "product-product-3",
    "product-product-4",
  ],
});

const hoverToClick = new HoverToClickTrack({
  elementIds: ["product-product-1"],
});

nekosenseInstance.pagePerformance();
// nekosenseInstance.heatMap();
nekosenseInstance.add(mouseClickEvent);
nekosenseInstance.add(hoverToClick);
