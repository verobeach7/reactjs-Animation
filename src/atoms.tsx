import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector({
  key: "hours",
  // get함수: 값을 가져옴.
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  // set함수: 값을 리턴함. set(minuteState, 10) <- minuteState의 값을 10으로 정함.
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    // minuteState의 값을 minutes으로 바꿈.
    set(minuteState, minutes);
  },
});
