import { atom, selector } from "recoil";
import {
  getPathBetween,
  startHouseState,
  pathTypeState,
  pathsAtom,
} from "./paths";

export const task11Atom = atom({
  key: "task11",
  default: null,
});

export const maxDistanceState = atom({
  key: "maxDistanceState",
  default: 10000,
});

export const maxTimeState = atom({
  key: "maxTimeState",
  default: 15,
});

export const pathLimitState = atom({
  key: "pathLimitState",
  default: null,
});

export const task11ClosesObject = selector({
  key: "getClosestObjState",
  get: ({ get }) => {
    const task11 = get(task11Atom);

    const activeHouseId = get(startHouseState);
    const pathType = get(pathTypeState);

    if (activeHouseId && pathType && task11) {
      return task11["closest"][pathType][activeHouseId];
    }
    return null;
  },
});

export const task11PathToClosestObject = selector({
  key: "pathClosestObject",
  get: ({ get }) => {
    const startId = get(startHouseState);
    const endId = get(task11ClosesObject);

    const pathType = get(pathTypeState);
    const paths = get(pathsAtom);

    if (startId && endId && pathType) {
      return getPathBetween(startId, endId, pathType, paths);
    }

    return null;
  },
});

export const task11ObjectsInRadius = selector({
  key: "task11ObjectsInRadius",
  get: ({ get }) => {
    const task11 = get(task11Atom);
    const activeHouseId = get(startHouseState);
    const pathLimit = get(pathLimitState);
    const pathType = get(pathTypeState);
    if (activeHouseId && pathType && task11 && pathLimit) {
      return task11["inRange"][pathType][pathLimit][activeHouseId];
    }
    return null;
  },
});
