import { TrackingEvent } from "./event.js";
import { Handler } from "./types/handler.js";

export class HeatMapTrack implements TrackingEvent {
  public type: string = "mousemove";
  handler: Handler = (context, ele, event) => {
    context.data.x = window.screenX;
    context.data.y = window.screenY;
    fetch(context.config.endPoint, {
      method: "POST",
      body: JSON.stringify({
        ele: ele.id,
        data: JSON.stringify(context.data),
      }),
    })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };
  preCallback?: Handler | undefined;
  afterCallback?: Handler | undefined;
  elementIds: string[];
  options?: AddEventListenerOptions | undefined;
  constructor(elementIds: string[], options?: AddEventListenerOptions) {
    this.elementIds = elementIds;
  }
}
