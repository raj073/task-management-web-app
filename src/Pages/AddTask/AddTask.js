import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Contexts/AuthProvider";
import Loading from "../../Pages/Loading/Loading";
import toast from "react-hot-toast";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      priority: "",
    },
  });

  const { user, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  const imageHostKey = process.env.REACT_APP_imgbb;

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        handleAddTask();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  if (loading) {
    return <Loading></Loading>;
  }

  const handleAddTask = (data) => {
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
          const task = {
            taskName: data.name,
            taskDetails: data.details,
            taskPriority: data.priority,
            image: imgData.data.url,
            assingedBy: user?.displayName,
            email: user.email,
            taskStatus: "Not Completed",
            assingedTime: new Date(),
          };
          console.log(task);

          // Save Task information to the database
          fetch("http://localhost:5000/addTask", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} Task is Added Successfully`, {
                position: "top-right",
              });
              navigate("/mytasks");
            });
        }
      });
  };

  return (
    <div className="bg-[#1D283A]">
      <div className="mx-[10%] mt-8">
        <div className="my-5">
          <h1 className="text-3xl font-serif font-bold text-teal-600 mb-3 text-center">
            Plase Add a Task to Explore
          </h1>
          <hr className="border-1 border-blue-500 cursor-pointer hover:border-orange-500 duration-500" />
        </div>
        <div className="divider"></div>
        <form
          className="max-w-xl m-auto py-10 my-12 px-12 border shadow-md"
          onSubmit={handleSubmit(handleAddTask)}
        >
          <h1
            className="text-center text-2xl font-semibold font-serif text-transparent bg-clip-text 
            bg-gradient-to-r from-sky-500 to-indigo-500 mb-3"
          >
            Add a Task
          </h1>
          <hr className="border-1 border-white cursor-pointer hover:border-orange-500 duration-500 mb-3" />
          <div className="form-control">
            <label className="font-medium block mt-2 font-serif mb-3 text-left text-white">
              Task Name
            </label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              type="text"
              {...register("name", {
                required: "Task Name is Required",
              })}
              placeholder="Task Name"
              autoFocus
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="font-medium block mt-2 font-serif mb-3 text-left text-white">
              Task Details
            </label>
            <input
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
              {...register("image", {
                required: "Image is Required",
              })}
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-white"
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
