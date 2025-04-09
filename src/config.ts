export interface Config {
  endPoint: string;
  protocol: "websocket" | "http";
  headers?: Record<string, string>;
}
