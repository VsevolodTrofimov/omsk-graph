import { atom } from "recoil";

export const activeTaskAtom = atom({
  key: "activeTask",
  default: null,
});
