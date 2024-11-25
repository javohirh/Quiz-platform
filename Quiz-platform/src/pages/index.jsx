import React from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdOutlineReadMore } from "react-icons/md";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request, { REQUESTS } from "../API";
import { Link } from "react-router-dom";
const QuizCreate = () => {
  const queryClient = useQueryClient();

  const handleDelete = (id) => {
    console.log(id);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const mutation = useMutation({
    mutationFn: (value) => {
      request
        .post(REQUESTS.category_api, {
          title: value.Category,
        })
        .then((categoryId) => {
          request
            .post(REQUESTS.sub_category, {
              title: value.SubCategory,
              categoryId: categoryId.data,
            })
            .then((dataID) => {
              request
                .post(REQUESTS.quiz, {
                  text: value.Quiz,
                  description: "description1",
                  language: "UZ",
                  subCategoryId: dataID.data,
                })
                .then((quiz) => {
                  request.post(REQUESTS.option, {
                    text: value.Quiz,
                    isCorrect: value.checked,
                    quizId: quiz.data,
                  });
                });
            });
        });
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
      }, 500);
    },
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: () => request.get("/category"),
  });
  console.log(data);

  const onSubmit = (value) => {
    mutation.mutate(value);
    reset();
  };
  if (isLoading) {
    return (
      <div className=" flex justify-center mt-[300px] ">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-[100px] h-[1] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    );
  }
  const inputs = ["Category", "SubCategory", "Quiz", "Option"];
  return (
    <>
      <form
        className="flex mt-5 flex-col gap-3 p-2 py-4  max-w-[450px] mx-auto bg-slate-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs.map((input) => {
          return (
            <input
              key={input}
              className="px-2 rounded-sm py-1"
              placeholder={input}
              {...register(input, { required: true })}
            />
          );
        })}
        <div className="flex gap-4 justify-center">
          <input {...register("checked")} type="checkbox" />
          <h2>Is correct</h2>
        </div>

        {errors.exampleRequired && <span>This field is required</span>}

        <button className="p-2 my-5 bg-green-500" type="submit">
          Submit
        </button>
      </form>
      <div className="w-[1200px] mx-auto mt-[100px] mb-[100px] flex flex-wrap gap-[20px] justify-center">
        {data?.data?.data?.map((product) => {
          return (
            <div
              key={product.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <input
                id="edit"
                name="edit"
                value={product.title}
                className="mb-2 text-2xl cursor-pointer bg-transparent font-bold tracking-tight text-gray-900 dark:text-white"
              />

              <div className="flex gap-[10px] items-center">
                <button
                  // onClick={handleEdit}
                  className="bg-blue-500 py-[10px] px-[20px] rounded-xl text-white flex gap-[10px]"
                >
                  <CiEdit size={24} />
                  <label htmlFor="edit">Edit</label>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 py-[10px] px-[13px] rounded-xl text-white flex gap-[10px]"
                >
                  <MdDelete size={24} />
                  Delete
                </button>
                <Link to="/sub">
                  <button className="bg-green-600 py-[10px] px-[20px] rounded-xl items-center text-white flex gap-[10px]">
                    More <MdOutlineReadMore size={24} />
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QuizCreate;
