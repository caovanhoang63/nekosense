# 🐾 Nekosense

**Nekosense** is a lightweight Typescript library for React/Next.js applications that tracks user behavior such as clicks, hovers, scrolls, time-on-page, and more. Easy to integrate – ideal for behavior analytics or UI/UX optimization.

---

## 🚀 Features

* 📦 Track events like:

  * Click
  * Hover
  * Page Performance
  * Time on Page
* ⚙️ Flexible configuration
* 🔌 Easy to integrate into React / Next.js
* 🧠 Store and analyze user behavior
* 🪶 Lightweight and performant

---

## 📦 Installation

```bash
npm install nekosense
```

or

```bash
yarn add nekosense
```

---

## ⚙️ Usage

### 1. Create **`nekosenseInstance.ts`** in your `src` folder
This file will contain your Nekosense configuration and event trackers. You can import and reuse it anywhere in your app.

```tsx
import {
  Config,
  HoverToClickTrack,
  MouseClickTrack,
  NekoSense,
} from "nekosense";

const config: Config = {
  protocol: "http",
  endPoint: YOUR_API_ENDPOINT, 
};
export const nekosenseInstance = new NekoSense(config);

const mouseClickEvent = new MouseClickTrack({
  elementIds: [
    "header",
    "product-product-1",
    "product-product-2",
    "product-product-3",
    "product-product-4",
    //other element id
  ],
});

const hoverToClick = new HoverToClickTrack({
elementIds: [
    "product-product-1",
    "product-product-2",
    "product-product-3",
    "product-product-4",
    //other element id
  ],
});

nekosenseInstance.pagePerformance();
nekosenseInstance.heatMap();
nekosenseInstance.add(mouseClickEvent);
nekosenseInstance.add(hoverToClick);

```

### 2. Start `nekosenseInstance`
Make sure to initialize nekosenseInstance at the outermost level of your app (e.g., inside App.tsx or _app.tsx in Next.js) to ensure all tracking is activated.

```tsx
nekosenseInstance.start();
```
---

## 📊 Data Output

User behavior data can be stored locally or sent to an endpoint depending on your config. Use it for analysis or visualizations.

---

## 🧪 TODO (planned)

* Built-in analytics dashboard
* Better Next.js SSR support
* Plugin support for video watch time, form inputs, etc.

---

## 📝 License

MIT © 2025 [caovanhoang63](https://github.com/caovanhoang63) and [nhdhieuu](https://github.com/nhdhieuu)

---

## 💡 Feedback / Contributions?

Pull requests and issues are always welcome ❤️

[⭐ Star this repo](https://github.com/caovanhoang63/nekosense) | [🐛 Report Issues](https://github.com/caovanhoang63/nekosense/issues) 
