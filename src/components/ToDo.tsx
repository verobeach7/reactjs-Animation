import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  // onClick 함수를 이용하여 button의 name을 잡아옴.
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      // oldToDo가 어디에 있는지 찾음.
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // newToDo에 category만 변경하여 객체를 만듦.
      const newToDo = { text, id, category: name as IToDo["category"] };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
    /* setToDos((prev) =>
      prev.map((oldToDo) => {
        if (oldToDo.id === id) {
          return { text, id, category: name as any };
        }
        return oldToDo;
      })
    ); */
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
  /* // interface의 내부 일부 요소를 사용하는 방법: IToDo["category"]
  const onClick = (newCategory: IToDo["category"]) => {};
  // const onClick=(newCategory:"TO_DO" | "DOING" | "DONE")=>{}
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  ); */
}

export default ToDo;
