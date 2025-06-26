import { Config } from "./config.js";
import { Handler } from "./types/handler.js";
import { TrackingEvent } from "./event.js";
import { Context } from "./context.js";
import { onLCP, onCLS, onINP, Metric } from "web-vitals";

export const defaultConfig: Config = {
  endPoint: "http://localhost:3000",
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
    console.log("Starting NekoSense");
    for (const event of this.events) {
      this.trackElementEvent(event);
    }
    this.pageView();
    this.timeOnPage();
  }

  private trackElementEvent(trackingEvent: TrackingEvent) {
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
            data: {},
            config: this.config,
          };
          this.handlerChain.forEach((handler) =>
            handler(ctx, el, ev as UIEvent),
          );
          trackingEvent.preHandler?.(ctx, el, ev as UIEvent);
          trackingEvent.handler(ctx, el, ev as UIEvent);
        },
        trackingEvent.options,
      );
    });
  }

  public interceptor(callback: Handler) {
    this.handlerChain.push(callback);
  }

  private sendData(eventName: string, eventData: object) {
    const payload = {
      event: eventName,
      data: eventData,
      url: window.location.href,
      timestamp: Date.now(),
    };

    if (navigator.sendBeacon) {
      navigator.sendBeacon(this.config.endPoint, JSON.stringify(payload));
    } else {
      fetch(this.config.endPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((e) => {
        console.error("NekoSense Error:", e);
      });
    }
  }

  public pageView() {
    this.sendData("pageView", {});
  }

  public timeOnPage() {
    let pageViewStartTime = Date.now();

    const sendTime = () => {
      if (pageViewStartTime > 0) {
        const duration = Date.now() - pageViewStartTime;
        if (duration > 100) {
          this.sendData("timeOnPage", { duration });
        }
      }
    };

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        sendTime();
        pageViewStartTime = 0;
      } else if (document.visibilityState === "visible") {
        pageViewStartTime = Date.now();
      }
    });

    document.addEventListener("pagehide", sendTime, { capture: true });
  }

  public pagePerformance() {
    const trackMetric = (metric: Metric) => {
      this.sendData("performance", metric);
    };
    onLCP(trackMetric);
    onCLS(trackMetric);
    onINP(trackMetric);
  }

  public heatMap() {
    let mousePositions: { x: number; y: number; timestamp: number }[] = [];
    document.addEventListener("mousemove", (event) => {
      const position = {
        x: event.clientX,
        y: event.clientY,
        timestamp: Date.now(),
      };
      mousePositions.push(position);
    });
    setInterval(() => {
      if (mousePositions.length > 0) {
        this.sendData("heatMap", { mousePositions });
        mousePositions = [];
      }
    }, 700);
  }
}
