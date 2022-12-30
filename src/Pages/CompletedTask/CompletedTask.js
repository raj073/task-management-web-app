import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";

const CompletedTask = () => {
  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: myCompletedTasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myCompletedTasks"],
    queryFn: async () => {
      const res = await fetch(
        `https://task-management-web-app-server.vercel.app/complete-task`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleCompleteTask = (myCompletedTasks) => {
    fetch(
      `https://task-management-web-app-server.vercel.app/complete-task/${myCompletedTasks._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(
            `${myCompletedTasks.taskName} Marked as Not Completed successfully!!`
          );
          refetch();
          navigate("/mytasks");
        }
      });
  };

  const handleDeleteTask = (_id) => {
    fetch(`https://task-management-web-app-server.vercel.app/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Task Deleted Successfully`);
        }
      });
  };

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-5 mx-[10%] mt-8">
      <div className="my-5">
        <h1 className="text-3xl font-serif font-bold text-teal-600 mb-3 text-center">
          Total Completed Tasks: {myCompletedTasks.length}
        </h1>
        <hr className="border-2 border-blue-500 cursor-pointer hover:border-orange-500 duration-500 mb-3" />
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th></th>
              <th scope="col" className="py-3 px-6 text-white">
                Task Name
              </th>
              <th scope="col" className="py-3 px-6 text-white">
                Task Details
              </th>
              <th scope="col" className="py-3 px-6 text-white">
                Action
              </th>
              <th scope="col" className="py-3 px-6 text-white">
                Status
              </th>
              <th scope="col" className="py-3 px-6 text-white">
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {myCompletedTasks?.map((task, i) => (
              <tr
                key={task._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th className="px-4 text-white">{i + 1}</th>
                <th
                  scope="row"
                  className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={task.image}
                    alt="Jese"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {task.taskName}
                    </div>
                    <div className="font-normal text-gray-500">
                      {task.email}
                    </div>
                  </div>
                </th>
                <td className="py-4 px-6 text-white">{task.taskDetails}</td>

                <td className="py-4 px-6">
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleCompleteTask(task)}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Mark as Not Completed
                  </button>
                </td>
                <td className="py-4 px-6">
                  <input
                    defaultValue={task.taskStatus}
                    className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                    type="text"
                    placeholder="Your Comment"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedTask;
