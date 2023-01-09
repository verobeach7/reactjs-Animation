import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // useRecoilValue는 atom이나 selector의 값만 반환함.
  const toDos = useRecoilValue(toDoSelector);
  // useRecoilState는 value와 modifierFunction도 함께 반환함.
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  // console.log(category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      {/** select value에 category를 연결하여 값이 변하면 value도 변하게 함. */}
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
