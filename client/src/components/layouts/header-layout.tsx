import { useEffect, useLayoutEffect, useRef } from "react";
import { NavLink, useLocation, useNavigationType } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import { paths } from "@/config/paths";
import { Button, ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FaX } from "react-icons/fa6";
import "./header-layout.css";
import AuthModal from "../auth/auth-modal";
import LoginButton from "../auth/login-button";
import ToolsMenu from "../ui/tools-menu";

export function HeaderLayout({ children }: { children: React.ReactNode }) {
  const navbarRef = useRef<HTMLElement | null>(null);
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [opened, { open, close }] = useDisclosure(false);

  const location = useLocation();
  const isToolsActive = location.pathname.startsWith("/tools");
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    // clean just in case theme gets saved with quotes (which they were)
    const cleanTheme = theme.replace(/['"]+/g, "");
    document.documentElement.classList.remove("dark-theme", "light-theme");
    document.documentElement.classList.add(`${cleanTheme}-theme`);
  }, [theme]);

  const openSidebar = () => {
    navbarRef.current?.classList.add("show");
  };
  const closeSidebar = () => {
    navbarRef.current?.classList.remove("show");
  };

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="site-container">
      <AuthModal opened={opened} close={close} />
      <header className="header-wrapper">
        <div className="header-left-content">
          <NavLink
            key="Home"
            className={({ isActive }) => {
              return isActive ? "header-link active-link" : "header-link";
            }}
            to={paths.app.home.getHref()}
          >
            <div className="header-element">
              <p>Home</p>
            </div>
          </NavLink>
        </div>
        <nav id="navbar" ref={navbarRef}>
          <ul>
            <li>
              <button id="close-sidebar-button" onClick={closeSidebar}>
                <FaX />
              </button>
            </li>
            <li key={"Tools"}>
              <div className={`nav-link ${isToolsActive ? "active-link" : ""}`}>
                <div className="header-element">
                  <ToolsMenu closeSidebar={closeSidebar} />
                </div>
              </div>
            </li>
            <li key={"Resources"}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                to={paths.app.resources.getHref()}
                key={"Resources"}
                onClick={closeSidebar}
              >
                <div className="header-element">
                  <p>Learn</p>
                </div>
              </NavLink>
            </li>
            <li className="mobile-only">
              <NavLink
                key="Login"
                className="nav-link accent-link"
                to={paths.auth.login.getHref()}
                onClick={closeSidebar}
              >
                <Button
                  classNames={{ root: "login-button-mobile" }}
                  variant="filled"
                  size="md"
                  fullWidth
                >
                  Sign In
                </Button>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-right-content">
          <div className="theme-switcher">
            <Tooltip
              color="var(--secondary-color-invert)"
              style={{ color: "var(--text-color-invert)" }}
              label={theme === "light" ? "Dark Mode" : "Light Mode"}
              withArrow
            >
              <ActionIcon
                classNames={{ root: "theme-button" }}
                onClick={switchTheme}
                variant="transparent"
                size="lg"
              >
                {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
              </ActionIcon>
            </Tooltip>
          </div>
          <LoginButton open={open} />
        </div>
        <div className="header-element icon">
          <button id="open-sidebar-button" onClick={openSidebar}>
            <FiMenu size={24} />
          </button>
        </div>
      </header>

      <main className="main">{children}</main>

      <footer className="footer-wrapper">
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
