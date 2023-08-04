import NavItem from "../nav-item/nav-item";
import "./nav-bar-nav.scss";

export default function NavBarNav() {
  return (
    <ul className="nav-bar-nav">
      <NavItem destination="/" pageName="Home" />
      <NavItem destination="/education" pageName="Education" />
      <NavItem destination="/extracurriculars" pageName="Extracurriculars" />
      <NavItem destination="/awards-and-honors" pageName="Awards and Honors" />
      <NavItem destination="/contact-me" pageName="Contact Me" />
    </ul>
  );
}
