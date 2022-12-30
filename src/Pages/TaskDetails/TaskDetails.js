import React from "react";
import { useLoaderData } from "react-router-dom";

const TaskDetails = () => {
  const myTaskDetails = useLoaderData();
  const {
    taskName,
    taskDetails,
    taskPriority,
    image,
    email,
    taskStatus,
    assingedTime,
  } = myTaskDetails[0];

  return (
    <div className="bg-[#1D283A]">
      <div class="rounded-lg shadow-md lg:flex md:flex shadow-sky-600 my-5 mx-[10%] mt-8">
        <img
          class="object-cover w-full md:w-1/2 lg:w-1/3"
          src={image}
          alt="test"
        />
        <div class="px-6 py-4">
          <h4 class="mb-3 text-2xl font-bold tracking-tight text-sky-600">
            {taskName}
          </h4>
          <p class="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">Task Details:</span> {taskDetails}
          </p>
          <p class="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">Task Priority:</span> {taskPriority}
          </p>
          <p class="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">Task Status:</span> {taskStatus}
          </p>
          <p class="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">e-mail:</span> {email}
          </p>
          <p class="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">Assigned Date:</span> {assingedTime}
          </p>
          {taskStatus === "Completed" ? (
            <>
              <button
                class="px-4 py-2 font-bold shadow bg-sky-100 shadow-sky-600 text-sky-700 hover:bg-sky-600 hover:text-sky-100 
          mt-7"
              >
                Mark as Not Completed
              </button>
            </>
          ) : (
            <>
              <button
                class="px-4 py-2 font-bold shadow bg-sky-100 shadow-sky-600 text-sky-700 hover:bg-sky-600 hover:text-sky-100 
          mt-7"
              >
                Mark as Completed
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
