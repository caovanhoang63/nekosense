import { Config } from "./config.js";
import { Handler } from "./types/handler.js";
import { TrackingEvent } from "./event.js";
import { Context } from "./context.js";

const defaultConfig: Config = {
  endPoint: "https://api.nekosense.tech",
  protocol: "http",
};

export default class NekoSense {
  private readonly config: Config;
  private readonly handlerChain: Handler[] = [];
  private readonly events: TrackingEvent[] = [];
  public constructor(config: Config = defaultConfig) {
    this.config = config;
  }
  public add(trackingEvent: TrackingEvent) {
    this.events.push(trackingEvent);
  }

  public start() {
    for (const event of this.events) {
      this.track(event);
    }
  }

  private track(trackingEvent: TrackingEvent) {
    if (!trackingEvent.elementIds) return;
    if (trackingEvent.elementIds.length <= 0) {
      console.warn("Element id not specified");
      return;
    }

    for (let i = 0; i < trackingEvent.elementIds.length; i++) {
      const el = document.getElementById(trackingEvent.elementIds[i]);
      if (!el) {
        console.warn(`Element ${trackingEvent.elementIds[i]} not specified`);
        continue;
      }
      el.addEventListener(
        trackingEvent.type,
        (ev: Event) => {
          const ctx: Context = {
            data: null,
            config: this.config,
          };
          for (const handler of this.handlerChain) {
            handler(ctx, el, ev as UIEvent);
          }
          trackingEvent.preCallback?.(ctx, el, ev as UIEvent);
          trackingEvent.handler(ctx, el, ev as UIEvent);
          trackingEvent.afterCallback?.(ctx, el, ev as UIEvent);
        },
        trackingEvent.options,
      );
    }
  }

  public interceptor(callback: Handler) {
    this.handlerChain.push(callback);
  }
}
