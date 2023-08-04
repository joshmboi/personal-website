import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./main.scss";
import App from "./components/app/app";
import Home from "./components/home/home";
import Education from "./components/education/education";
import Extracurriculars from "./components/extracurriculars/extracurriculars";
import AwardsAndHonors from "./components/awards-and-honors/awards-and-honors";
import Contact from "./components/contact/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "education",
        element: <Education />,
      },
      {
        path: "extracurriculars",
        element: <Extracurriculars />,
      },
      {
        path: "awards-and-honors",
        element: <AwardsAndHonors />,
      },
      {
        path: "contact-me",
        element: <Contact />,
      }
    ],
  },
])

const domNode = document.getElementById("root")
if (domNode !== null) {
  const root = createRoot(domNode)
  root.render(
    <RouterProvider router={router} />
  )
}
