import { TrackingEvent } from "./event.js";
import { Handler } from "./types/handler.js";

export class HoverToClickTrack implements TrackingEvent {
  public type: string = "mouseenter"; // Bắt đầu từ hover

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
        if (duration > 1000) {
          fetch(context.config.endPoint, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              ele: id,
              event: "hover-to-click",
              duration,
            }),
          }).catch((e) => console.error(e));
        }
      }
    };

    ele.addEventListener("mouseleave", onLeave, { once: true });
    ele.addEventListener("click", onClick, { once: true });
  };
  elementIds?: string[] | undefined;
  elementPatternIds?: string[] | undefined;
  options?: AddEventListenerOptions | undefined;

  constructor(elementIds?: string[], options?: AddEventListenerOptions) {
    this.elementIds = elementIds;
    this.options = options;
  }
}
