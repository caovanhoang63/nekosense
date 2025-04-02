import { Config } from "./config.js";
import { Handler } from "./types/handler.js";
import { TrackingEvent } from "./event.js";
import { Context } from "./context.js";

export const defaultConfig: Config = {
  endPoint: "https://api.nekosense.tech",
  protocol: "http",
};

export class NekoSense {
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
    if (!trackingEvent.elementIds || trackingEvent.elementIds.length === 0) {
      console.warn("Element id not specified");
      return;
    }
    const elements = trackingEvent.elementIds
      .map((id) => document.getElementById(id))
      .filter((el) => el);
    if (elements.length === 0) {
      console.warn("No valid elements found");
      return;
    }
    elements.forEach((el) => {
      el?.addEventListener(
        trackingEvent.type,
        (ev: Event) => {
          const ctx: Context = {
            data: null,
            config: this.config,
          };
          this.handlerChain.forEach((handler) =>
            handler(ctx, el, ev as UIEvent),
          );
          trackingEvent.handler(ctx, el, ev as UIEvent);
        },
        trackingEvent.options,
      );
    });
  }

  public interceptor(callback: Handler) {
    this.handlerChain.push(callback);
  }
}
