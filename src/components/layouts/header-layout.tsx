import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import { paths } from "@/config/paths";
import { Tooltip } from "@mantine/core";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FaX } from "react-icons/fa6";
import "./header-layout.css";

export function HeaderLayout({ children }: { children: React.ReactNode }) {
  const navbarRef = useRef<HTMLElement | null>(null);

  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const navigation = [
    { name: "Tools", to: paths.app.tools.root.getHref() },
    { name: "Resources", to: paths.app.resources.getHref() },
  ];

  const openSidebar = () => {
    navbarRef.current?.classList.add("show");
  };
  const closeSidebar = () => {
    navbarRef.current?.classList.remove("show");
  };

  useEffect(() => {
    // clean just in case theme gets saved with quotes (which they were)
    const cleanTheme = theme.replace(/['"]+/g, "");
    document.documentElement.classList.remove("dark-theme", "light-theme");
    document.documentElement.classList.add(`${cleanTheme}-theme`);
  }, [theme]);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="site-container">
      <header className="header-wrapper">
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
                <FaX />
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
          <Tooltip
            color="grey"
            label={theme === "light" ? "Dark Mode" : "Light Mode"}
            offset={-10}
            arrowSize={5}
            withArrow
          >
            <button className="theme-switcher" onClick={switchTheme}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </Tooltip>
          <NavLink
            key="Login"
            className="header-link accent-link"
            to={paths.auth.login.getHref()}
          >
            Login
          </NavLink>
        </div>
        <button id="open-sidebar-button" onClick={openSidebar}>
          <FiMenu />
        </button>
      </header>
      <main className="main">{children}</main>
      <footer className="footer-wrapper">
        <h2>Footer</h2>
        <div className="footer-content">
          <div className="footer-col">
            <p>Links 1</p>
            <ul>
              <li>link</li>
              <li>link</li>
              <li>link</li>
              <li>link</li>
            </ul>
          </div>
          <div className="footer-col">
            <p>Links 2</p>
            <ul>
              <li>link</li>
              <li>link</li>
              <li>link</li>
              <li>link</li>
            </ul>
          </div>
          <div className="footer-col">
            <p>Links 3</p>
            <ul>
              <li>link</li>
              <li>link</li>
              <li>link</li>
              <li>link</li>
            </ul>
          </div>
          <div className="footer-col">
            <p>Links 4</p>
            <ul>
              <li>link</li>
              <li>link</li>
              <li>link</li>
              <li>link</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
