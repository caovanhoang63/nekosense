import { Config } from "../config.js";

export type Handler = (config: Config, event: UIEvent) => void;
