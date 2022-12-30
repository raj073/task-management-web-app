import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../Contexts/AuthProvider";
import Loading from "../Loading/Loading";

const TaskDetails = () => {
  const myTaskDetails = useLoaderData();
  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    _id,
    taskName,
    taskDetails,
    taskPriority,
    image,
    email,
    taskStatus,
    assingedTime,
  } = myTaskDetails[0];

  const handleUpdateNotCompletedToCompletedStatus = (_id) => {
    fetch(`http://localhost:5000/mytask/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Task Marked as Completed successfully!!`, {
            position: "top-right",
          });
          navigate("/completedtask");
        }
      });
  };

  const handleUpdateCompletedToNotCompletedStatus = (_id) => {
    fetch(`http://localhost:5000/complete-task/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`Task Marked as Not Completed successfully!!`, {
            position: "top-right",
          });
          navigate("/mytasks");
        }
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-[#1D283A]">
      <div className="rounded-lg shadow-md lg:flex md:flex shadow-sky-600 my-5 mx-[10%] mt-8">
        <img
          className="object-cover w-full md:w-1/2 lg:w-1/3"
          src={image}
          alt="test"
        />
        <div className="px-6 py-4">
          <h4 className="mb-3 text-2xl font-bold tracking-tight text-sky-600">
            {taskName}
          </h4>
          <p className="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">Task Details:</span> {taskDetails}
          </p>
          <p className="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">Task Priority:</span> {taskPriority}
          </p>
          <p className="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">Task Status:</span> {taskStatus}
          </p>
          <p className="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">e-mail:</span> {email}
          </p>
          <p className="mb-2 text-lg leading-normal text-justify text-sky-600">
            <span className="font-bold">Assigned Date:</span> {assingedTime}
          </p>
          {taskStatus === "Completed" ? (
            <>
              <button
                onClick={() => handleUpdateCompletedToNotCompletedStatus(_id)}
                className="px-4 py-2 font-bold shadow bg-sky-100 shadow-sky-600 text-sky-700 hover:bg-sky-600 hover:text-sky-100 
          mt-7"
              >
                Mark as Not Completed
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleUpdateNotCompletedToCompletedStatus(_id)}
                className="px-4 py-2 font-bold shadow bg-sky-100 shadow-sky-600 text-sky-700 hover:bg-sky-600 hover:text-sky-100 
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
