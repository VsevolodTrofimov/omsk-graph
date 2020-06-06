import { atom, selector } from "recoil";
import { makeTree } from "./paths";

export const task14Atom = atom({
  key: "task14Atom",
  default: null,
});

export const task14Tree = selector({
  key: "task14Tree",
  get: ({ get }) => {
    const task14 = get(task14Atom);

    if (!task14) {
      return null;
    }

    return makeTree(task14.tree.edges);
  },
});
