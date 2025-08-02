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

//This routes the pages and has the children be independent of each other.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
  //This ensures the NavBar is on the landing page as it's separate from the
  //other pages and not returned by the Root page.
  {
    path: "/pages/Home",
    element:  (
      <div>
        <Navigation />
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
