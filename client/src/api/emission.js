import { get, post } from "./base/base";

export const emission =  (data) => post("/calculator/emission", data);
