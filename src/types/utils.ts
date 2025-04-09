import { Context } from "../context.js";

export type Nullable<T> = T | null;
export function nekoFetch(context: Context, ele: HTMLElement, event: string) {
  fetch(context.config.endPoint, {
    method: context.method || "POST",
    headers: {
      ...context.config?.headers,
    },
    body: JSON.stringify({
      event,
      eleId: ele.id,
      data: context.data,
    }),
  })
    .then((response) => {})
    .catch((error) => {
      console.error(error);
    });
}
