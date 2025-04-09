import { TrackingEvent, TrackingEventParams } from "./event.js";
import { Handler } from "./types/handler.js";
import _ from "lodash";
export class HeatMapTrack implements TrackingEvent {
  public type: string = "mouseover";
  handler: Handler = (context, ele, event) => {
    const mouseEvent = event as MouseEvent;
    context.data.x = mouseEvent.clientX;
    context.data.y = mouseEvent.clientY;
    this.fetchDebounce(context, ele, event);
  };

  private fetchDebounce = _.throttle((context, ele, event) => {
    fetch(context.config.endPoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        event: "heatmap",
        ele: ele.id,
        data: context.data,
      }),
    }).catch((e) => {
      console.error(e);
    });
  }, 700);
  elementIds: string[];
  preHandler?: Handler;
  options?: AddEventListenerOptions | undefined;
  constructor(params: TrackingEventParams) {
    this.elementIds = params.elementIds || [];
    this.options = params.options || {};
    this.preHandler = params.preHandler;
  }
}
