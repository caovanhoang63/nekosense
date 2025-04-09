import { TrackingEvent, TrackingEventParams } from "./event.js";
import { Handler } from "./types/handler.js";
import { nekoFetch } from "./types/utils.js";

export class MouseClickTrack implements TrackingEvent {
  public type: string = "click";
  handler: Handler = (context, ele, event) => {
    let ok = false;
    nekoFetch(context, ele, "click");
    if (!ok) {
      navigator.sendBeacon(
        context.config.endPoint,
        JSON.stringify({ event: "click", eleId: ele.id }),
      );
    }
  };
  elementIds?: string[] | undefined;
  elementPatternIds?: string[] | undefined;
  options?: AddEventListenerOptions | undefined;

  constructor(params: TrackingEventParams) {
    this.elementIds = params.elementIds || [];
    this.options = params.options || {};
  }
}
