import { atom, selector } from "recoil";
import { getNodePosition } from "./paths";

export const task13Atom = atom({
  key: "task13",
  default: null,
});

export const task13ShortestDistances = selector({
  key: "task13ShortestDistances",
  get: ({ get }) => {
    const task13 = get(task13Atom);
    if (task13) {
      console.log(task13["routes"]);
      return task13["routes"].map((route) => route.map(getNodePosition));
    }
    return null;
  },
});
