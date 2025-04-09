import { TrackingEvent } from "./event.js";
import { Handler } from "./types/handler.js";
export class HeatMapTrack implements TrackingEvent {
  public type: string = "mousemove";
  handler: Handler = (context, ele, event) => {
    const mouseEvent = event as MouseEvent;
    context.data.x = mouseEvent.clientX;
    context.data.y = mouseEvent.clientY;
    fetch(context.config.endPoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        event: "heatmap",
        ele: ele.id,
        data: JSON.stringify(context.data),
      }),
    }).catch((e) => {
      console.error(e);
    });
  };
  elementIds: string[];
  options?: AddEventListenerOptions | undefined;
  constructor(elementIds: string[], options?: AddEventListenerOptions) {
    this.elementIds = elementIds;
  }
}
