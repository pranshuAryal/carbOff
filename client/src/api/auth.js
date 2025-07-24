import { get, post } from "./base/base";

export const createUser =  (data) => post("/auth/signup", data);
export const login = (data) => post("/auth/login", data);
