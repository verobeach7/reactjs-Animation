import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState } from "../atoms";

interface IFormCategory {
  category: string;
}

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 10px auto;
  position: relative;
  input {
    height: 100%;
    width: 100%;
    border: none;
    border-radius: 20px;
    padding-left: 20px;
    padding-right: 90px;
    &:focus {
      outline: none;
    }
  }
  button {
    position: absolute;
    right: 0;
    width: 80px;
    height: 40px;
    border: none;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: ${(props) => props.theme.btnBgColor};
    &:hover {
      background-color: ${(props) => props.theme.accentColor};
    }
  }
`;

function CreateCategory() {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IFormCategory>();
  const handleValid = ({ category }: IFormCategory) => {
    console.log(category);
    setCategories([...categories, category]);
    setValue("category", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", { required: "Please write a Category." })}
        placeholder="Category name..."
      />
      <button>추가</button>
    </Form>
  );
}

export default CreateCategory;
