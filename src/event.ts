import { Handler } from "./types/handler.js";

export interface TrackingEvent {
  type: string;
  handler: Handler;
  preCallback?: Handler;
  afterCallback?: Handler;
  elementIds?: string[];
  elementPatternIds?: string[];
  options?: AddEventListenerOptions;
}
// product-*
