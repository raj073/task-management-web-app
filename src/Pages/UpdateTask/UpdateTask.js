import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Contexts/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const UpdateTask = () => {
  const mySingleTask = useLoaderData();
  const { _id, taskName, taskDetails, taskPriority } = mySingleTask[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      priority: taskPriority,
    },
  });

  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const imageHostKey = process.env.REACT_APP_imgbb;

  const handleUpdate = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        if (imgData.success) {
          const updatedTask = {
            taskName: data.name,
            taskDetails: data.details,
            taskPriority: data.priority,
            image: imgData.data.url,
            assingedTime: new Date(),
          };
          fetch(`http://localhost:5000/mytask/${_id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedTask),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.modifiedCount > 0) {
                toast.success("Task successfully updated", {
                  position: "top-right",
                });
              }
              navigate("/mytasks");
              //   reset({});
              //   e.target.reset();
            });
        }
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-5 mx-[10%] mt-8">
      <div className="my-5">
        <h1 className="text-3xl font-serif font-bold text-teal-600 mb-3 text-center">
          Update a Task{" "}
        </h1>
        <hr className="border-1 border-blue-500 cursor-pointer hover:border-orange-500 duration-500" />
      </div>
      <div className="divider"></div>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="max-w-xl m-auto py-10 my-12 px-12 border shadow-md"
      >
        <h1
          className="text-center text-2xl font-semibold font-serif text-transparent bg-clip-text 
            bg-gradient-to-r from-sky-500 to-indigo-500 mb-3"
        >
          Update a Task
        </h1>
        <hr className="border-1 border-white cursor-pointer hover:border-orange-500 duration-500 mb-3" />
        <div className="form-control">
          <label className="text-white font-medium block mt-2 font-serif mb-3 text-left">
            Task Name
          </label>
          <input
            defaultValue={taskName}
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
            type="text"
            {...register("name", {
              required: "Task Name is Required",
            })}
            placeholder="Task Name"
            autoFocus
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="form-control">
          <label className="text-white font-medium block mt-2 font-serif mb-3 text-left">
            Task Details
          </label>
          <input
            defaultValue={taskDetails}
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
            type="text"
            {...register("details", {
              required: "Task Details is Required",
            })}
            placeholder="Task Details"
          />
          {errors.details && (
            <p className="text-red-500">{errors.details.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="text-white font-medium block mt-2 font-serif mb-3 text-left">
            Priority
          </label>
          <select
            {...register("priority", {
              required: "Priority is Required",
            })}
            className="select select-bordered border-solid border-gray-300 border py-2 px-4 w-full 
        rounded text-gray-700"
          >
            <option disabled value="">
              Select Priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {errors.priority && (
            <p className="text-red-500">{errors.priority.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="text-white font-medium block mt-2 font-serif mb-3 text-left">
            <span className="label-text">Image Upload</span>
          </label>
          <input
            type="file"
            required
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-white"
            {...register("image", {
              required: "Image is Required",
            })}
          />
          {errors.image && (
            <p className="text-red-500 text-left">{errors.image.message}</p>
          )}
        </div>

        <button
          className="mt-4 w-full bg-green-400 hover:bg-green-600 text-white border py-3 px-6 
          font-bold text-md rounded"
          type="submit"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
