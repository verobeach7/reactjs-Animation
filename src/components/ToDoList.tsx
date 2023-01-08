import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // useRecoilValue는 atom이나 selector의 값만 반환함.
  const toDos = useRecoilValue(toDoSelector);
  // useRecoilState는 value와 modifierFunction도 함께 반환함.
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  // console.log(category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      {/** select value에 category를 연결하여 값이 변하면 value도 변하게 함. */}
      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {/** 이 방법으로 해도 category별로 보여주기는 하겠지만 좋은 방법이 아님. selector를 활용하여 해결하면 좋음. */}
      {/* {category === "TO_DO" &&
        toDo.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DOING" &&
        doing.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DONE" &&
        done.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)} */}
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
