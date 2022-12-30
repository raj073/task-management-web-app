import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import CompletedTask from "../../Pages/CompletedTask/CompletedTask";
import Home from "../../Pages/Home/Home";
import MyTasks from "../../Pages/MyTasks/MyTasks";
import Register from "../../Pages/Register/Register";
import SignIn from "../../Pages/SignIn/SignIn";
import TaskDetails from "../../Pages/TaskDetails/TaskDetails";
import UpdateTask from "../../Pages/UpdateTask/UpdateTask";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addtask",
        element: <AddTask></AddTask>,
      },
      {
        path: "/mytasks",
        element: <MyTasks></MyTasks>,
      },
      {
        path: "/completedtask",
        element: <CompletedTask></CompletedTask>,
        loader: () => {
          return fetch("http://localhost:5000/complete-task");
        },
      },
      {
        path: "/mytask/:id",
        element: <UpdateTask></UpdateTask>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/mytask/${params.id}`),
      },
      {
        path: "/taskdetails/:id",
        element: (
          <PrivateRoute>
            <TaskDetails></TaskDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/taskdetails/${params.id}`),
      },
    ],
  },
]);

export default router;
