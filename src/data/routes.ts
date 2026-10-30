import { items } from "@/data/navbar";

export const afterLoginRoute = 2 in items ? items[2].href : "/";
