import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface ToolCardProps {
  bgColor: string;
  to: string;
  name: string;
  icon: IconType;
  size?: number;
}

export default function ToolCard({
  bgColor,
  to,
  name,
  icon: Icon,
  size = 200,
}: ToolCardProps) {
  return (
    <>
      <NavLink
        to={to}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          background: bgColor,
          color: "white",
          width: size,
          height: size,
          borderRadius: size * 0.08,
          gap: size * 0.125,
        }}
      >
        <Icon size={size * 0.5} />
        <p
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: "0.25rem",
          }}
        >
          {name}
        </p>
      </NavLink>
    </>
  );
}
