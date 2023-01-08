import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  /* const value=useRecoilValue(toDoState);
  const modFn=useSetRecoilState(toDoState); */
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // data를 다 받아오는 것이 아닌 원하는 것만 받아오고 싶을 때는 {}를 이용하면 됨. data.toDo만 가져오는 것.
  const handleValid = ({ toDo }: IForm) => {
    console.log("add to do", toDo);
    // ()안에 직접 값을 넣을 수도 있고 함수를 넣어 함수의 리턴값을 넣게 할 수도 있음.
    // ...oldToDos는 배열 안에 oldToDos 배열이 가지고 있던 element 요소를 반환해줌.
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", { required: "Please write a To Do." })}
          placeholder="To do..."
        />
        <button>Add</button>
        <ul>
          {toDos.map((toDo) => (
            <li key={toDo.id}>{toDo.text}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default ToDoList;
