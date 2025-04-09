import { TrackingEvent, TrackingEventParams } from "./event.js";
import { Handler } from "./types/handler.js";
import { nekoFetch } from "./types/utils.js";

export class HoverToClickTrack implements TrackingEvent {
  public type: string = "mouseenter";
  private hoverStartTimes: Map<string, number> = new Map();
  handler: Handler = (context, ele, event) => {
    const id = ele.id;
    const now = Date.now();
    this.hoverStartTimes.set(id, now);
    const onLeave = () => {
      this.hoverStartTimes.delete(id);
      ele.removeEventListener("mouseleave", onLeave);
      ele.removeEventListener("click", onClick);
    };
    const onClick = () => {
      const hoverStart = this.hoverStartTimes.get(id);
      if (hoverStart) {
        const duration = Date.now() - hoverStart;
        context.data.duration = duration;
        if (duration > 1000) {
          nekoFetch(context, ele, "hover-to-click");
        }
      }
    };
    ele.addEventListener("mouseleave", onLeave, { once: true });
    ele.addEventListener("click", onClick, { once: true });
  };
  elementIds?: string[] | undefined;
  elementPatternIds?: string[] | undefined;
  options?: AddEventListenerOptions | undefined;
  constructor(params: TrackingEventParams) {
    this.elementIds = params.elementIds || [];
    this.options = params.options || {};
  }
}
