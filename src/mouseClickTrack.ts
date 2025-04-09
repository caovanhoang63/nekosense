import { TrackingEvent } from "./event.js";
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
        data: JSON.stringify(context.data),
      }),
    }).catch((e) => {
      console.error(e);
    });
  };
  elementIds?: string[] | undefined;
  elementPatternIds?: string[] | undefined;
  options?: AddEventListenerOptions | undefined;
  constructor(elementIds: string[], options?: AddEventListenerOptions) {
    this.elementIds = elementIds;
    this.options = options || {};
  }
}
