import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

// atom을 항상 쳐다보고 있음. state에 변화가 생기면 함수를 실행 후 리턴값을 보내줌.
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // get() 함수를 이용하여 toDoState에 있는 데이터를 가져옴
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === "TO_DO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
    /* // toDoState atom을 주시
    const toDos = get(toDoState);
    return toDos.length; */
  },
});
