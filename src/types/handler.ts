import { Context } from "../context.js";

export type Handler = (
  context: Context,
  ele: HTMLElement,
  event: UIEvent,
) => void;
