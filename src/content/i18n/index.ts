import type { Lang } from "../types";
import { fr, type Dict } from "./fr";
import { en } from "./en";

export const dictionaries: Record<Lang, Dict> = { fr, en };
export const defaultLang: Lang = "fr";
export type { Dict };
