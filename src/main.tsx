import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FutureReads from "./pages/FutureReads.tsx";
import Finished from "./pages/Finished.tsx";
import Current from "./pages/Current.tsx";
import Root from "./Root.tsx";
import Home from "./pages/Home.tsx";
import Navigation from "./components/Navigation.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    // Part that doesn't change - Navbar
    element: <Root />,
    // Options for the part that does change - Pages
    children: [
      {
        path: "/pages/Current",
        element: <Current />,
      },
      {
        path: "/pages/FutureReads",
        element: <FutureReads />,
      },
      {
        path: "/pages/Finished",
        element: <Finished />,
      },
    ],
  },
  {
    path: "/pages/Home",
    element:  (
      <div>
        <Navigation/>
        <Home/>
      </div>
    ),
  },
]);

createRoot(document.getElementById("main")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
