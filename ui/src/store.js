import { atom, selector } from "recoil";
import graph from "./graph.json";
import dist from "./1.1.json";

const houses = [];
const infra = [];

Object.keys(graph).forEach((nodeId) => {
  if (graph[nodeId].tag === "apartments") {
    houses.push(nodeId);
  } else if (graph[nodeId].tag) {
    infra.push(nodeId);
  }
});

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

export const clickedHouseIdState = atom({
  key: "activeHouseState",
  default: null,
});

export const pathTypeState = atom({
  key: "pathTypeState",
  default: null,
});

export const popupHouseState = atom({
  key: "popupHouseState",
  default: null,
});

export const startHouseState = atom({
  key: "startHouseState",
  default: null,
});

export const closestObjState = selector({
  key: "getClosestObjState",
  get: ({ get }) => {
    const activeHouseId = get(startHouseState);
    const pathType = get(pathTypeState);
    if (activeHouseId && pathType)
      return dist["closest"][pathType][activeHouseId];
    return null;
  },
});

export const pathClosestObject = selector({
  key: "pathClosestObject",
  get: ({ get }) => {
    const startId = get(startHouseState);
    const endId = get(closestObjState);
    const pathType = get(pathTypeState);
    if (startId && endId && pathType)
      return getPathBetween(startId, endId, pathType);
    return null;
  },
});

function getPathBetween(startId, endId, pathType) {
  const route =
    pathType === "round"
      ? dist["paths"][`${startId}-${endId}`]["route"]
      : dist["paths"][startId][endId]["route"];
  return route.map((nodeId) => [graph[nodeId].y, graph[nodeId].x]);
}

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
