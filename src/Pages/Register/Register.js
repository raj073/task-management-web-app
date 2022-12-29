import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photoURL, email, password);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        form.reset();
        navigate("/");
        handleUpdateUserProfile(name, photoURL);
        toast.success("User Registration Successful", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        form.reset();
      });
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };

    updateUser(profile)
      .then(() => {})
      .catch(() => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
            Sign up
          </h1>
          <form className="mt-6" onSubmit={handleRegister}>
            <div className="mb-2">
              <label
                for="name"
                className="block text-sm font-semibold text-gray-800 text-left"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label
                for="photoUrl"
                className="block text-sm font-semibold text-gray-800 text-left"
              >
                Photo URL
              </label>
              <input
                type="text"
                name="photoURL"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800 text-left"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800 text-left"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Sign In
              </button>
            </div>
          </form>
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">OR</div>
          </div>

          <p className="mt-8 text-sm font-light text-center text-gray-700">
            {" "}
            Already Have an Account?{" "}
            <Link
              to="/signin"
              className="text-purple-600 hover:underline font-bold hover:cursor-pointer"
            >
              PLease Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
