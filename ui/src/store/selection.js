import { atom, selector } from "recoil";
import graph from "../graph.json";

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
  key: "selectedHousesState",
  default: [],
});

export const selectedInfraState = atom({
  key: "selectedInfraState",
  default: [],
});

export const splitNodes = selector({
  key: "splitNodes",
  get: ({ get }) => {
    const passiveNodes = {};
    const selectedNodes = {};
    const roadNodes = {};
    const selectedHouses = get(selectedHousesState);

    for (let nodeId in graph) {
      if (!graph[nodeId].hasOwnProperty("tag")) {
        roadNodes[nodeId] = graph[nodeId];
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
    return { passiveNodes, selectedNodes, roadNodes };
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
