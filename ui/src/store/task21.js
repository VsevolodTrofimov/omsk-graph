import { atom, selector } from "recoil";
import { makeTree } from "./paths";

export const task21Atom = atom({
  key: "task21Atom",
  default: null,
});

export const task21Tree = selector({
  key: "task21Tree",
  get: ({ get }) => {
    const task21 = get(task21Atom);

    if (!task21) {
      return null;
    }

    return makeTree(task21.treeEdges);
  },
});
