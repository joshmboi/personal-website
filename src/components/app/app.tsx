import { Outlet } from "react-router-dom";
import NavBar from "../nav-bar/nav-bar";

import "./app.scss";

export default function App() {
  return (
    <div className="whole-page">
      <NavBar />
      <Outlet />
    </div>
  );
}
