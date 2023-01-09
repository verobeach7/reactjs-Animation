import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, IToDo, toDoState } from "../atoms";

const ToDoComponent = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  span {
    padding: 5px 12px;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 2px;
  button {
    border: none;
    border-radius: 10px;
    background-color: #ffcccc;
    color: #ff3838;
  }
`;

const BtnContainer = styled.button`
  display: flex;
  flex-wrap: wrap;
  border: none;
  background-color: transparent;
  button {
    margin: 5px;
    padding: 8px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.btnBgColor};
    &:hover {
      background-color: ${(props) => props.theme.accentColor};
    }
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  console.log(category);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      return oldToDos.filter((toDo) => toDo.id !== id);
    });
  };
  return (
    <ToDoComponent>
      <ContentsContainer>
        <span>{text}</span>
        <button onClick={onDelete}>Delete</button>
      </ContentsContainer>
      <BtnContainer>
        {categories.map(
          (currentCategory) =>
            currentCategory !== category && (
              <button name={currentCategory} onClick={onClick}>
                {currentCategory}
              </button>
            )
        )}
      </BtnContainer>
    </ToDoComponent>
  );
}

export default ToDo;
