import { atom, selector } from "recoil";
import {
  pathTypeState,
  getPathBetween,
  pathsAtom,
} from "./paths";

export const task13Atom = atom({
  key: "task13",
  default: null,
});