import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    console.log(data);
    console.log("add to do", data.toDo);
    // form이 제출되고 나면 input의 value를 초기화함.
    setValue("toDo", "");
  };
  return (
    <div>
      {/** handleSubmit이 data의 유효성 검사를 실시하고 유효하다면 직접 만든 handleValid 함수를 호출 */}
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", { required: "Please write a To Do." })}
          placeholder="To do..."
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
