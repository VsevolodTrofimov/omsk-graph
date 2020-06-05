import { atom } from "recoil";
import graph from "../graph.json";

export const pathsAtom = atom({
  key: "paths",
  default: {},
});

export const popupHouseState = atom({
  key: "popupHouseState",
  default: null,
});

export const startHouseState = atom({
  key: "startHouseState",
  default: null,
});

export const pathTypeState = atom({
  key: "pathTypeState",
  default: null,
});

export function getPathBetween(startId, endId, pathType, paths) {
  const route =
    pathType === "round"
      ? paths[`${startId}-${endId}`]["route"]
      : paths[startId][endId]["route"];

  return route.map((nodeId) => [graph[nodeId].y, graph[nodeId].x]);
}
