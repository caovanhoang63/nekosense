import NekoSense from "./nekosense.js";
import { HeatMapTrack } from "./heatMapTrack.js";

console.log("Happy developing ✨");
function a() {
  console.log("Happy");
}
const Instance = new NekoSense();
const HeatMap = new HeatMapTrack([]);
Instance.add(HeatMap);
Instance.start();
