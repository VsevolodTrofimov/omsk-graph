import { atom, selector } from "recoil";
import { makeTree, getNodePosition } from "./paths";

export const task22Atom = atom({
  key: "task22Atom",
  default: null,
});

export const task22CentroidTree = selector({
  key: "task22CentroidTree",
  get: ({ get }) => {
    const task22 = get(task22Atom);

    if (!task22) {
      return null;
    }

    return makeTree(task22.centroidTree.edges);
  },
});

export const task22ClusterTrees = selector({
  key: "task22ClusterTrees",
  get: ({ get }) => {
    const task22 = get(task22Atom);

    if (!task22) {
      return null;
    }

    return task22.clusterTrees.map((x) => makeTree(x.edges));
  },
});

export const task22CentroidPositions = selector({
  key: "task22Centroids",
  get: ({ get }) => {
    const task22 = get(task22Atom);

    if (!task22) {
      return null;
    }

    return task22.centroids.map(getNodePosition);
  },
});
