import { TrackingEvent, TrackingEventParams } from "./event.js";
import { Handler } from "./types/handler.js";

export class MouseClickTrack implements TrackingEvent {
  public type: string = "click";
  handler: Handler = (context, ele, event) => {
    fetch(context.config.endPoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        event: "click",
        eleId: ele.id,
      }),
    }).catch((e) => {
      console.error(e);
    });
  };
  elementIds?: string[] | undefined;
  elementPatternIds?: string[] | undefined;
  options?: AddEventListenerOptions | undefined;

  constructor(params: TrackingEventParams) {
    this.elementIds = params.elementIds || [];
    this.options = params.options || {};
  }
}
