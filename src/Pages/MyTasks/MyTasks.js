import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const MyTasks = () => {
  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: myTasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTasks"],
    queryFn: async () => {
      const res = await fetch(
        `https://task-management-web-app-server.vercel.app/mytask`
      );
      const data = await res.json();
      return data;
    },
  });

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

  const handleUpdateCompletedStatus = (_id) => {
    fetch(`https://task-management-web-app-server.vercel.app/mytask/${_id}`, {
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
          refetch();
          navigate("/completedtask");
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
          My Tasks: {myTasks.length}
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
                Task Status
              </th>
            </tr>
          </thead>
          <tbody>
            {myTasks?.map((task, i) => (
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
                  </button>{" "}
                  <Link to={`/mytask/${task._id}`}>
                    <button
                      className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      {" "}
                      Update
                    </button>
                  </Link>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleUpdateCompletedStatus(task._id)}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-50"
                    type="button"
                    disabled={task.taskStatus === "Completed"}
                  >
                    Completed
                  </button>
                </td>
                <td className="py-4 px-6">
                  <Link to={`/taskdetails/${task._id}`}>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;
