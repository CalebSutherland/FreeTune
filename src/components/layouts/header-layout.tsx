import { useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { paths } from "@/config/paths";

import "./header-layout.css";

export function HeaderLayout({ children }: { children: React.ReactNode }) {
  const navbarRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  const navigation = [
    { name: "Tools", to: paths.app.tools.getHref() },
    { name: "Resources", to: paths.app.resources.getHref() },
  ];

  function openSidebar() {
    navbarRef.current?.classList.add("show");
  }
  function closeSidebar() {
    navbarRef.current?.classList.remove("show");
  }

  return (
    <div className="site-container">
      <div className="header-wrapper">
        <div className="header-left-content">
          <NavLink
            key="Home"
            className={({ isActive }) => {
              return isActive ? "header-link active-link" : "header-link";
            }}
            to={paths.app.home.getHref()}
          >
            Home
          </NavLink>
        </div>
        <nav id="navbar" ref={navbarRef}>
          <ul>
            <li>
              <button id="close-sidebar-button" onClick={closeSidebar}>
                X
              </button>
            </li>
            {navigation.map((item) => (
              <li
                className={item.name === "Resources" ? "split-li" : ""}
                key={item.name}
              >
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  to={item.to}
                  key={item.name}
                  onClick={closeSidebar}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className="mobile-only">
              <NavLink
                key="Login"
                className="nav-link accent-link"
                to={paths.auth.login.getHref()}
                onClick={closeSidebar}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-right-content">
          <NavLink
            key="Login"
            className="header-link accent-link"
            to={paths.auth.login.getHref()}
          >
            Login
          </NavLink>
        </div>
        <button id="open-sidebar-button" onClick={openSidebar}>
          M
        </button>
      </div>
      <main className="main">{children}</main>
    </div>
  );
}
