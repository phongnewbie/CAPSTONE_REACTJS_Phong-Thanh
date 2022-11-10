import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <li className="nav-item">
          <NavLink className="dropdown-item" to="/trangchufilm">
            film
          </NavLink>
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
