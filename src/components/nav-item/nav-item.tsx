import { Link } from "react-router-dom";

import "./nav-item.scss";

interface NavItemProps {
  destination: string;
  pageName: string;
}

export default function NavItem({ destination, pageName }: NavItemProps) {
  return (
    <li className="nav-item">
      <Link to={destination} className="nav-link">
        {pageName}
      </Link>
    </li>
  );
}
