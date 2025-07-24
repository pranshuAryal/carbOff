import { get, post } from "./base/base";

export const loginUser =  (data) => post("/auth/login", data);