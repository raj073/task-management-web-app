import React, { useContext } from "react";
import tm from "../../assets/images/task.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import Loading from "../Loading/Loading";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="">
      <section className="container items-center px-4 pb-12 mx-auto mt-20 lg:flex md:px-40">
        <div className="flex-1 space-y-4 sm:text-center lg:text-left mr-5">
          <h1 className="text-4xl font-bold text-yellow-500">
            Welcome to Task Management System
          </h1>
          <p className="max-w-xl leading-relaxed text-gray-300 sm:mx-auto lg:ml-0">
            {user?.uid ? (
              <>
                <h1 className="text-white text-2xl font-semibold">
                  Hi !{" "}
                  <span className="text-orange-500 font-bold">
                    {user?.displayName}
                  </span>{" "}
                  <br /> Please Explore the Feature of Task Management System
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-white text-2xl font-semibold">
                  Please{" "}
                  <Link
                    to="/signin"
                    className="text-orange-500 font-bold underline"
                  >
                    Login
                  </Link>{" "}
                  <br /> and Explore the Most Recent Feature of Task Management
                  System
                </h1>
              </>
            )}
          </p>
          <div className="items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <Link
              to="/addtask"
              className="block px-6 py-2 text-center text-white bg-yellow-600 rounded-md uppercase font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div>
          <img
            src={tm}
            className="w-full mx-auto mt-6 sm:w-10/12 lg:w-full bg-[#1D283A] rounded-md"
            alt="Task Management"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
