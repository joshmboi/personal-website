import NavBarNav from "../nav-bar-nav/nav-bar-nav";
import "./nav-bar.scss";

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <ul className="nav-bar-nav">
        <NavBarNav />
      </ul>
    </nav>
  );
}
