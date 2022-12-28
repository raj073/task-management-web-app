import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import Home from "../../Pages/Home/Home";
import Register from "../../Pages/Register/Register";
import SignIn from "../../Pages/SignIn/SignIn";

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
    ],
  },
]);

export default router;
