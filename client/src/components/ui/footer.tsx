import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import { FaGithub } from "react-icons/fa";
import "./footer.css";

export default function Footer() {
  const tools = [
    { name: "Instrument Tuner", link: paths.app.tools.tuner.getHref() },
    {
      name: "Chord Library",
      link: paths.app.tools.chord_library.root.getHref(),
    },
    { name: "Metronome", link: paths.app.tools.metronome.getHref() },
    { name: "Classic Tuner", link: paths.app.tools.classic_tuner.getHref() },
  ];

  return (
    <footer className="footer-wrapper">
      <div className="footer-col">
        <p>Links</p>
        {tools.map((tool) => (
          <Link key={tool.name} to={tool.link}>
            {tool.name}
          </Link>
        ))}
      </div>
      <div className="footer-col">
        <p>Social</p>
        <Link
          className="social-link"
          to="https://github.com/CalebSutherland/FreeTune"
        >
          <FaGithub />
          <span style={{ paddingLeft: "0.5rem" }}>Github</span>
        </Link>
      </div>
      <div className="footer-col">
        <p>Legal</p>
        <Link to={paths.app.tools.tuner.getHref()}>Privacy Policy</Link>
      </div>
    </footer>
  );
}
