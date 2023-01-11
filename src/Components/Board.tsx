import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 15px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <div
            style={{ backgroundColor: "red" }}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              // Beautiful DND에서는 key와 draggableId는 무조건 같아야 함.
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
