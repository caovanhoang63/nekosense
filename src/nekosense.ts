import { Config } from "./config.js";
import { Handler } from "./types/handler.js";

const defaultConfig: Config = {
  endPoint: "https://api.nekosense.tech",
  protocol: "http",
};

export default class NekoSense {
  private readonly config: Config;
  private readonly handlerChain: Handler[] = [];
  public constructor(config: Config = defaultConfig) {
    this.config = config;
  }

  public track(trackingEvent: TrackingEvent) {
    for (let i = 0; i < trackingEvent.elementIds.length; i++) {
      const el = document.getElementById(trackingEvent.elementIds[i]);
      if (!el) {
        continue;
      }
      el.addEventListener(
        trackingEvent.type,
        (this: HTMLElement, ev: UIEvent) => {
          for (const handler of this.handlerChain) {
            handler(ev);
          }
          trackingEvent?.preCallback(this.config, ev);
          trackingEvent.handler(this.config, ev);
          trackingEvent.afterCallback(this.config, ev);
        },
      );
    }
  }

  public interceptor(callback: (config: Config, event: UIEvent) => {}) {
    this.handlerChain.push(callback);
  }
}
