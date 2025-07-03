import InstrumentTuner from "@/features/instrument-tuner/components/tuner/tuner";
import "./home.css";
import ToolsRow from "@/components/ui/tools-row";

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="landing-wrapper">
        <div className="side-content">
          <h1>FreeTune</h1>
          <p>Tuning could never be easier</p>
        </div>
        <div className="main-content">
          <InstrumentTuner />
        </div>
      </div>
      <ToolsRow />
      <div className="tools-wrapper">
        <h2>Resources</h2>
        <div className="card-row">
          <p>resource</p>
          <p>resource</p>
          <p>resource</p>
          <p>resource</p>
        </div>
      </div>
    </div>
  );
}
