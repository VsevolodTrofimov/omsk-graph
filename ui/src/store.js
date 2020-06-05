import { atom, selector } from "recoil";
import graph from "./graph.json";

const houses = [];
const infra = [];

Object.keys(graph).forEach((nodeId) => {
  if (graph[nodeId].tag === "apartments") {
    houses.push(nodeId);
  } else if (graph[nodeId].tag) {
    infra.push(nodeId);
  }
});

// user selection
export const selectedHousesState = atom({
  key: "pojebat",
  default: ["6143120", "31634315", "31638933", "31645187"],
});

export const selectedInfraState = atom({
  key: "hui",
  default: ["45980009", "363303438"],
});

export const splitNodes = selector({
  key: "splitNodes",
  get: ({ get }) => {
    const passiveNodes = {};
    const selectedNodes = {};
    const selectedHouses = get(selectedHousesState);

    console.log(selectedHouses);
    for (let nodeId in graph) {
      if (!graph[nodeId].hasOwnProperty("tag")) {
        continue;
      } else {
        if (
          selectedHouses.includes(nodeId) ||
          get(selectedInfraState).includes(nodeId)
        ) {
          selectedNodes[nodeId] = graph[nodeId];
        } else {
          passiveNodes[nodeId] = graph[nodeId];
        }
      }
    }
    return { passiveNodes, selectedNodes };
  },
});

function getSample(arr, n) {
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function getRandom(houseCount, infraCount) {
  return [getSample(houses, houseCount), getSample(infra, infraCount)];
}

// pathFinding
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

function getPathBetween(startId, endId, pathType, paths) {
  const route =
    pathType === "round"
      ? paths[`${startId}-${endId}`]["route"]
      : paths[startId][endId]["route"];

  return route.map((nodeId) => [graph[nodeId].y, graph[nodeId].x]);
}

// task11
export const task11Atom = atom({
  key: "task11",
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
