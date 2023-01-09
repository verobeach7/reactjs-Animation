import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  margin: 0 auto;
  max-width: 400;
`;

const Header = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: white;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 400px;
  gap: 10px;
  button {
    height: 40px;
    border: none;
    border-radius: 20px;
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.cardBgColor};
    &:hover {
      background-color: #ffeaa7;
    }
  }
  button[disabled] {
    background-color: #fdcb6e;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <>
      <Container>
        <Header>
          <Title>To Do</Title>
        </Header>
        <hr />
        <CreateCategory />
        <GridContainer>
          {categories.map((currentCategory) => (
            <button
              disabled={currentCategory === category}
              key={currentCategory}
              value={currentCategory}
              onClick={onClick}
            >
              {currentCategory}
            </button>
          ))}
        </GridContainer>
        <hr />
        <CreateToDo />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Container>
    </>
  );
}

export default ToDoList;
