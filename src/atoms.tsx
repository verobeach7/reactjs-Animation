import { atom, selector } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedToDos = localStorage.getItem(key);
    if (savedToDos != null) {
      setSelf(JSON.parse(savedToDos));
    }

    onSet((newToDos: IToDo, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newToDos));
    });
  };

export const categoriesState = atom({
  key: "categories",
  default: ["할 일", "진행 중", "완료"],
  effects: [localStorageEffect("categories")],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect("toDo")],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
