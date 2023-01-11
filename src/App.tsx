import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      // 수정이 일어난 보드만 복사 후 수정, 나머지 보드는 복사하여 붙여주기
      // oldToDos는 array가 아닌 객체(object)임.
      setToDos((allBoards) => {
        // 해당 보드의 array만 복사
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        // 객체 안에서 키 값이 중복된 프로퍼티는 마지막에 선언된 프로퍼티로 사용됨.
        // 키 값에 변수값을 넣으려면 대괄호[]를 사용해야 함. 자바스크립트 문법.
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
  };
  // DragDropContext 내에서 DraggableCard를 움직이고 놓으면 onDragEnd가 호출됨.
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
