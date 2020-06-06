import { atom, selector } from "recoil";
import {
  pathTypeState,
  startHouseState,
} from "./paths";

export const task12Atom = atom({
  key: "task12",
  default: null,
});

export const task12MinPathMaxObject = selector({
  key: "getMinPathMaxObject",
  get: ({ get }) => {
    const task12 = get(task12Atom);
    const pathType = get(pathTypeState);
    const activeHouseId = get(startHouseState);
    if (pathType && task12) {
      return task12["minmax"][pathType][activeHouseId];
    }
    return null;
  },
});