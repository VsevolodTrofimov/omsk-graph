import { atom, selector } from "recoil";
import { pathTypeState, getPathBetween, pathsAtom } from "./paths";

export const task12Atom = atom({
  key: "task12",
  default: null,
});

export const task12MinPathMaxObject = selector({
  key: "getMinPathMaxObject",
  get: ({ get }) => {
    const task12 = get(task12Atom);
    const pathType = get(pathTypeState);
    const paths = get(pathsAtom);
    if (pathType && task12 && paths) {
      return getPathBetween(
        task12["minmax"][pathType]["start"],
        task12["minmax"][pathType]["end"],
        pathType,
        paths
      );
    }
    return null;
  },
});
