import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  // interface를 사용하여 type 지정
  // defaultValues를 이용하여 초기값을 설정 가능
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  // 기본적인 유효성검사를 마친 후 폼을 제출하면 비밀번호 일치에 대한 유효성검사를 진행함.
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      // setError의 첫번째 인자는 원하는 error 이름을 지어주면 됨.
      // error가 발생했을 때 원하는 곳에 focus 설정 가능
      setError(
        "password1",
        { message: "Password are not same." },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline." });
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed.",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>

        <input
          {...register("firstName", {
            required: "Write here.",
            // {} 객체를 이용하여 여러가지 조건을 유효성 검사 가능
            validate: {
              noNico: (value) => !value.includes("nico") || "No nico allowed.",
              noNick: (value) => !value.includes("nick") || "No nick allowed.",
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>

        <input
          {...register("lastName", { required: "Write here." })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>

        <input
          {...register("username", { required: "Write here.", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>

        <input
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>

        <input
          {...register("password1", { required: "Write here.", minLength: 5 })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
