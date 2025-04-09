import { Handler } from "./types/handler.js";

export interface TrackingEvent {
  type: string;
  handler: Handler;
  preHandler?: Handler;
  elementIds?: string[];
  elementPatternIds?: string[];
  options?: AddEventListenerOptions;
}

export interface TrackingEventParams {
  preHandler?: Handler;
  elementIds?: string[];
  elementPatternIds?: string[];
  options?: AddEventListenerOptions;
}
