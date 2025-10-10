import { NavLink } from "react-router-dom";

import { paths } from "@/config/paths";
import { Menu } from "@mantine/core";
import { FaBook, FaChevronDown, FaGuitar } from "react-icons/fa6";
import { MdTune } from "react-icons/md";
import { PiMetronome } from "react-icons/pi";

interface ToolsMenuProps {
  closeSidebar: () => void;
}

export default function ToolsMenu({ closeSidebar }: ToolsMenuProps) {
  const tools_navigation = [
    {
      name: "Instrument Tuner",
      to: paths.app.tools.tuner.getHref(),
      icon: <FaGuitar />,
    },
    {
      name: "Chord Library",
      to: paths.app.tools.chord_library.chord_library_key.getHref("C"),
      icon: <FaBook />,
    },
    {
      name: "Metronome",
      to: paths.app.tools.metronome.getHref(),
      icon: <PiMetronome />,
    },
    {
      name: "Classic Tuner",
      to: paths.app.tools.classic_tuner.getHref(),
      icon: <MdTune />,
    },
  ];

  return (
    <Menu
      trigger="click-hover"
      openDelay={100}
      closeDelay={400}
      shadow="xs"
      width={200}
      position="bottom"
      offset={10}
      classNames={{
        dropdown: "tools-menu",
        item: "tools-menu-item",
      }}
    >
      <Menu.Target>
        <div className="tools-header-element">
          <p>Tools</p>
          <FaChevronDown size={12} />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        {tools_navigation.map((item) => {
          const isActive =
            location.pathname === item.to ||
            (item.to !== "/tools" && location.pathname.startsWith(item.to));
          return (
            <Menu.Item
              component={NavLink}
              key={item.name}
              to={item.to}
              leftSection={item.icon}
              onClick={closeSidebar}
              className={`${isActive ? "active-menu-item" : ""}`}
            >
              {item.name}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
