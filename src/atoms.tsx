import { atom, selector } from "recoil";

/* // type은 정의 후 재사용이 가능함. 단순히 여러번 반복하는 것을 줄이기 위해 사용.
type categories = "TO_DO" | "DOING" | "DONE"; */

// ENUM: 반복적으로 사용할 것을 정의해놓고 쓰는 것. 일일이 타이핑하면서 실수하는 것을 줄임.
// ENUM은 일련의 숫자를 문자로 변환하여 표현해주는 것. 프로그래머를 도와주기 위한 것.
export enum Categories {
  /* "TO_DO", // 0
  "DOING", // 1
  "DONE", // 2 */
  "TO_DO" = "TO_DO", // "TO_DO"
  "DOING" = "DOING", // "DOING"
  "DONE" = "DONE", // "DONE"
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
