import { createBrowserRouter,redirect } from "react-router-dom";
import LoginPage from "../views/Loginpage";
import Home from "../views/Home";
import BaseLayout from "../views/BaseLayout";
import Detail from "../views/Details";
import AddPage from "../views/AddPage";
import EditPage from "../views/EditPage";
import Toastify from "toastify-js";
import RegisterPage from "../views/Registerpage";
const url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage url={url} />,
  },
  {
    path: "/login",
    element: <LoginPage url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/");
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <Home url={url} />,
      },
      {
        path: "/detail/:id",
        element: <Detail url={url} />,
      },
      {
        path: "/add",
        element: <AddPage url={url} />,
      },
      {
        path: "/edit/:id",
        element: <EditPage url={url} />,
      },
    ],
  },
]);

export default router;
