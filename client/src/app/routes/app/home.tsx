import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import InstrumentTuner from "@/features/instrument-tuner/components/tuner/tuner";
import ToolsRow from "@/components/ui/tools-row";
import "./home.css";
import EssentialChords from "@/components/ui/essential-chords";
import CreatorRow from "@/components/ui/creator-row";

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="landing-wrapper">
        <div className="side-content">
          <h1>FreeTune</h1>
          <p>Tuning could never be easier.</p>
        </div>
        <div className="main-content">
          <InstrumentTuner />
          <p style={{ padding: "0.5rem 0" }}>
            Need help? Read the instructions on the{" "}
            <Link to={paths.app.tools.tuner.getHref()}>Instrument Tuner</Link>{" "}
            page.
          </p>
        </div>
      </div>
      <ToolsRow />
      <EssentialChords homePage />
      <CreatorRow homePage />
    </div>
  );
}
